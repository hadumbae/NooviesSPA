/**
 * @fileoverview Presentational component for the Seat submission form.
 * Handles the conditional rendering of logical fieldsets based on layout type and active fields.
 */

import {cloneElement, FC} from "react";
import {cn} from "@/common/lib/utils.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {RotateCcw} from "lucide-react";
import {SeatFormContext} from "@/domains/seats/context/form/SeatFormContext.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";

import {SeatFormValuesSchema, SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import {SeatDetails} from "@/domains/seats/schema/seat/SeatDetails.types.ts";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {HookFormFieldGroup} from "@/common/type/form/HookFormFieldGroupTypes.ts";

import SeatSubmitFormLayoutFieldset from "./SeatSubmitFormLayoutFieldset.tsx";
import {SeatSubmitFormDetailsFieldset} from "./SeatSubmitFormDetailsFieldset.tsx";
import SeatSubmitFormNonSeatFieldset from "./SeatSubmitFormNonSeatFieldset.tsx";
import SeatSubmitFormRowFieldset from "./SeatSubmitFormRowFieldset.tsx";
import SeatSubmitFormCoordinateFieldset from "./SeatSubmitFormCoordinateFieldset.tsx";
import SeatSubmitFormSeatFieldset from "./SeatSubmitFormSeatFieldset.tsx";
import {SeatForm} from "@/domains/seats/_feat/submit-data";

/**
 * Props for SeatSubmitFormView, templated for entity and form DTOs.
 */
type FormProps = FormViewProps<SeatDetails, SeatForm, SeatFormValues> & {
    className?: string;
    disableFields?: (keyof SeatFormValues)[];
};

/**
 * Renders the Seat submission form with dynamic fieldsets based on the layout type (SEAT vs NON-SEAT).
 */
const SeatSubmitFormView: FC<FormProps> = (props) => {
    const {className, form, submitHandler, mutation: {isPending}} = props;

    const {initialValues, setCurrentValues, options = {}} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    const {disableFields} = options;

    const layoutType = form.watch("layoutType");
    const isSeat = layoutType === "SEAT";

    const activeFields = getActiveSchemaInputFields({
        schema: SeatFormValuesSchema,
        disableFields,
    });

    /**
     * Configuration for logical groupings of form fields.
     */
    const fieldGroups: HookFormFieldGroup<SeatFormValues>[] = [
        {
            render: true,
            key: "seat-layout-field-set",
            fields: ["layoutType"],
            element: <SeatSubmitFormLayoutFieldset form={form} activeFields={activeFields} key="layout-1"/>
        },
        {
            render: true,
            key: "details-2",
            fields: ["theatre", "screen"],
            element: <SeatSubmitFormDetailsFieldset form={form} activeFields={activeFields}/>
        },
        {
            render: !isSeat,
            key: "non-seat-3",
            fields: ["row", "x", "y"],
            element: <SeatSubmitFormNonSeatFieldset form={form} activeFields={activeFields}/>
        },
        {
            render: isSeat,
            key: "row-3",
            fields: ["row", "seatNumber", "seatLabel"],
            element: <SeatSubmitFormRowFieldset form={form} activeFields={activeFields}/>
        },
        {
            render: isSeat,
            key: "coordinates-4",
            fields: ["x", "y"],
            element: <SeatSubmitFormCoordinateFieldset form={form} activeFields={activeFields}/>
        },
        {
            render: isSeat,
            key: "seat-5",
            fields: ["seatType", "priceMultiplier", "isAvailable"],
            element: <SeatSubmitFormSeatFieldset form={form} activeFields={activeFields}/>
        },
    ];

    const renderedFields = fieldGroups.map(({render, fields, key, element}) =>
        render && fields.some((field) => activeFields[field as keyof SeatFormValues])
            ? cloneElement(element, {key})
            : null
    );

    /**
     * Restores form to initial state and clears current selection in context.
     */
    const onReset = () => {
        if (initialValues) {
            form.reset(initialValues);
        }
        setCurrentValues(undefined);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-4", className)}>
                {renderedFields}
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