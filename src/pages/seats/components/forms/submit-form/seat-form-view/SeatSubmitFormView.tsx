/**
 * @file SeatSubmitFormView.tsx
 *
 * ⚡ SeatSubmitFormView
 *
 * Presentational component for rendering a dynamic Seat form.
 * Focuses purely on form rendering and fieldset layout, leaving
 * state management and submission orchestration to
 * {@link SeatSubmitFormContainer}.
 *
 * Responsibilities:
 * - Render active fields based on `SeatFormValuesSchema` and `disableFields`
 * - Conditionally render fieldsets according to `layoutType`
 * - Disable submit button while mutation is pending
 * - Provide reset functionality to restore `initialValues` from {@link SeatFormContext}
 *
 * Example:
 * ```tsx
 * <SeatSubmitFormView
 *   form={form}
 *   mutation={mutation}
 *   submitHandler={onSubmit}
 *   disableFields={["row", "seatLabel"]}
 *   className="p-6"
 * />
 * ```
 */

import {FC} from "react";
import {cn} from "@/common/lib/utils.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {RotateCcw} from "lucide-react";
import {SeatFormContext} from "@/pages/seats/context/form/SeatFormContext.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";

import {SeatFormValuesSchema, SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {HookFormFieldGroup} from "@/common/type/form/HookFormFieldGroupTypes.ts";

import SeatSubmitFormLayoutFieldset from "./SeatSubmitFormLayoutFieldset.tsx";
import SeatSubmitFormDetailsFieldset from "./SeatSubmitFormDetailsFieldset.tsx";
import SeatSubmitFormNonSeatFieldset from "./SeatSubmitFormNonSeatFieldset.tsx";
import SeatSubmitFormRowFieldset from "./SeatSubmitFormRowFieldset.tsx";
import SeatSubmitFormCoordinateFieldset from "./SeatSubmitFormCoordinateFieldset.tsx";
import SeatSubmitFormSeatFieldset from "./SeatSubmitFormSeatFieldset.tsx";

/**
 * Props for {@link SeatSubmitFormView}.
 *
 * ⚡ Templated over entity, form DTO, and form values
 */
type FormProps = FormViewProps<SeatDetails, SeatForm, SeatFormValues> & {
    className?: string;
    disableFields?: (keyof SeatFormValues)[];
};

/**
 * ⚡ SeatSubmitFormView component
 *
 * Renders a structured, dynamic seat form split into logical fieldsets.
 * Delegates state management and submission to the parent container.
 */
const SeatSubmitFormView: FC<FormProps> = (props) => {
    const {className, form, submitHandler, disableFields, mutation: {isPending}} = props;

    // ⚡ Context
    const {initialValues, setCurrentValues} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    // ⚡ Determine Layout
    const layoutType = form.watch("layoutType");
    const isSeat = layoutType === "SEAT";

    // ⚡ Active Fields
    const activeFields = getActiveSchemaInputFields({schema: SeatFormValuesSchema, disableFields});

    const fieldGroups: HookFormFieldGroup<SeatFormValues>[] = [
        {
            render: true,
            fields: ["layoutType"],
            element: <SeatSubmitFormLayoutFieldset form={form} activeFields={activeFields} key="layout-1"/>
        },
        {
            render: true,
            fields: ["theatre", "screen"],
            element: <SeatSubmitFormDetailsFieldset form={form} activeFields={activeFields} key="details-2"/>
        },
        {
            render: !isSeat,
            fields: ["row", "x", "y"],
            element: <SeatSubmitFormNonSeatFieldset form={form} activeFields={activeFields} key="non-seat-3"/>
        },
        {
            render: isSeat,
            fields: ["row", "seatNumber", "seatLabel"],
            element: <SeatSubmitFormRowFieldset form={form} activeFields={activeFields} key="row-3"/>
        },
        {
            render: isSeat,
            fields: ["x", "y"],
            element: <SeatSubmitFormCoordinateFieldset form={form} activeFields={activeFields} key="coordinates-4"/>
        },
        {
            render: isSeat,
            fields: ["seatType", "priceMultiplier", "isAvailable"],
            element: <SeatSubmitFormSeatFieldset form={form} activeFields={activeFields} key="seat-5"/>
        },
    ];

    const fields = fieldGroups.map(({render, fields, element}) =>
        render && fields.some((field) => activeFields[field as keyof SeatFormValues]) ? element : null
    );

    // ⚡ Handlers
    const onReset = () => {
        if (initialValues) form.reset(initialValues);
        setCurrentValues(undefined);
    };

    // ⚡ Render
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-4", className)}>
                {fields}
                <div className="flex items-center space-x-2">
                    <Button variant="primary" type="submit" className="flex-1" disabled={isPending}>
                        Submit
                    </Button>
                    <Button variant="secondary" type="button" disabled={isPending} onClick={onReset}>
                        <RotateCcw/>
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default SeatSubmitFormView;
