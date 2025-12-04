/**
 * @file SeatSubmitFormView.tsx
 *
 * @summary
 * Presentational React Hook Form component for creating or editing `Seat` entities.
 *
 * @description
 * `SeatSubmitFormView` is responsible for rendering a structured, dynamic form for
 * `Seat` data. It integrates with React Hook Form and uses the `SeatFormValuesSchema`
 * to determine active fields, optionally modified by the `disableFields` prop.
 *
 * This component is typically used together with `SeatSubmitFormContainer`, which
 * handles:
 * - Form initialization and validation
 * - Mutation handling (create/update)
 * - Supplying the `submitHandler` function
 *
 * `SeatSubmitFormView` focuses solely on **rendering** the form:
 * - Breaks the form into logical fieldsets (Layout, Details, Row, Coordinates, Seat)
 * - Conditionally renders fieldsets based on `layoutType` and active fields
 * - Disables the submit button when a mutation is pending
 * - Supports a reset button that reverts the form to `initialValues` from context
 *
 * ## Fieldsets
 * - **Layout**: layoutType
 * - **Details**: theatre, screen
 * - **Non-Seat**: row, x, y (rendered when layoutType is not "SEAT")
 * - **Row**: row, seatNumber, seatLabel (rendered when layoutType is "SEAT")
 * - **Coordinates**: x, y (rendered when layoutType is "SEAT")
 * - **Seat**: seatType, priceMultiplier, isAvailable (rendered when layoutType is "SEAT")
 */

import {cn} from "@/common/lib/utils.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {FC} from "react";
import SeatSubmitFormDetailsFieldset
    from "@/pages/seats/components/forms/submit-form/seat-form-view/SeatSubmitFormDetailsFieldset.tsx";
import SeatSubmitFormRowFieldset
    from "@/pages/seats/components/forms/submit-form/seat-form-view/SeatSubmitFormRowFieldset.tsx";
import SeatSubmitFormCoordinateFieldset
    from "@/pages/seats/components/forms/submit-form/seat-form-view/SeatSubmitFormCoordinateFieldset.tsx";
import SeatSubmitFormSeatFieldset
    from "@/pages/seats/components/forms/submit-form/seat-form-view/SeatSubmitFormSeatFieldset.tsx";
import {SeatFormValues, SeatFormValuesSchema} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import SeatSubmitFormLayoutFieldset
    from "@/pages/seats/components/forms/submit-form/seat-form-view/SeatSubmitFormLayoutFieldset.tsx";
import {HookFormFieldGroup} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import SeatSubmitFormNonSeatFieldset
    from "@/pages/seats/components/forms/submit-form/seat-form-view/SeatSubmitFormNonSeatFieldset.tsx";
import {RotateCcw} from "lucide-react";
import {SeatFormContext} from "@/pages/seats/context/form/SeatFormContext.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";

/**
 * Props for {@link SeatSubmitFormView}.
 *
 * @template TEntity - The entity type being modified (typically {@link Seat}).
 * @template TForm - The form submission DTO (typically {@link SeatForm}).
 * @template TFormValues - The React Hook Form value type (typically {@link SeatFormValues}).
 *
 * @property className - Optional CSS class applied to the root form container.
 * @property disableFields - Optional list of keys from `SeatFormValues` specifying fields
 * that should be disabled (removed from rendering entirely).
 */
type FormProps = FormViewProps<Seat, SeatForm, SeatFormValues> & {
    className?: string;
    disableFields?: (keyof SeatFormValues)[];
};

/**
 * @component SeatSubmitFormView
 *
 * Renders a fully structured, dynamic seat form split into fieldsets.
 *
 * Responsibilities:
 * - Dynamically renders active fields according to the Zod schema and `disableFields` prop
 * - Conditionally renders fieldsets based on the `layoutType` field
 * - Disables submit button while a mutation is pending
 * - Provides a reset button to revert to `initialValues` from {@link SeatFormContext}
 *
 * @param props - See {@link FormProps}.
 * @returns JSX element rendering the seat form.
 *
 * @example
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
const SeatSubmitFormView: FC<FormProps> = (props: FormProps) => {
    const {className, form, submitHandler, disableFields, mutation: {isPending}} = props;

    const {initialValues, setCurrentValues} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    const layoutType = form.watch("layoutType");
    const isSeat = layoutType === "SEAT";

    // Determine which fields are active based on schema + disables
    const activeFields = getActiveSchemaInputFields({
        schema: SeatFormValuesSchema,
        disableFields,
    });

    const fieldGroups: HookFormFieldGroup<SeatFormValues>[] = [
        {
            render: true,
            fields: ["layoutType"],
            element: <SeatSubmitFormLayoutFieldset form={form} activeFields={activeFields} key={`layout-1`} />,
        },
        {
            render: true,
            fields: ["theatre", "screen"],
            element: <SeatSubmitFormDetailsFieldset form={form} activeFields={activeFields} key={`details-2`} />,
        },
        {
            render: !isSeat,
            fields: ["row", "x", "y"],
            element: <SeatSubmitFormNonSeatFieldset form={form} activeFields={activeFields} key={`non-seat-3`} />
        },
        {
            render: isSeat,
            fields: ["row", "seatNumber", "seatLabel"],
            element: <SeatSubmitFormRowFieldset form={form} activeFields={activeFields} key={`row-3`} />,
        },
        {
            render: isSeat,
            fields: ["x", "y"],
            element: <SeatSubmitFormCoordinateFieldset form={form} activeFields={activeFields} key={`coordinates-4`} />,
        },
        {
            render: isSeat,
            fields: ["seatType", "priceMultiplier", "isAvailable"],
            element: <SeatSubmitFormSeatFieldset form={form} activeFields={activeFields} key={`seat-5`} />,
        },
    ];

    const fields = fieldGroups.map(
        ({render, fields, element}) => (
            render && fields.some((field) => activeFields[field as keyof SeatFormValues])
                ? element
                : null
        )
    );

    const onReset = () => {
        if (initialValues) form.reset(initialValues);
        setCurrentValues(undefined);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-4", className)}>
                {fields}

                <div className="flex items-center space-x-2">
                    <Button
                        variant="primary"
                        type="submit"
                        className="flex-1"
                        disabled={isPending}
                    >
                        Submit
                    </Button>

                    <Button
                        variant="secondary"
                        type="button"
                        disabled={isPending}
                        onClick={onReset}
                    >
                        <RotateCcw />
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default SeatSubmitFormView;
