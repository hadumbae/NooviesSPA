/**
 * @file SeatSubmitFormView.tsx
 *
 * @summary
 * A full-featured presentational form component for creating or updating `Seat` records.
 * It uses React Hook Form, dynamic field activation based on a Zod schema, and conditional
 * rendering based on parent configuration (such as disabling specific fields).
 *
 * @description
 * This component is typically paired with `SeatSubmitFormContainer`, which handles:
 * - Initializing form state and validation
 * - Managing mutations (create/update)
 * - Providing the `submitHandler`
 *
 * `SeatSubmitFormView` focuses purely on **rendering**:
 * - Breaks the form into logical fieldsets (Details, Row, Coordinates, Seat)
 * - Enables or disables fields dynamically via `disableFields`
 * - Automatically infers active fields using `getActiveSchemaInputFields` and the Zod schema
 * - Disables the submit button based on mutation status
 *
 * ## Fieldsets Rendered
 * - **Details**: theatre, screen
 * - **Row**: row, seatNumber, seatLabel
 * - **Coordinates**: x, y
 * - **Seat Data**: seatType, priceMultiplier, isAvailable
 *
 * All fieldsets render only when at least one relevant field is marked active.
 */

import {cn} from "@/common/lib/utils.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {SeatForm, SeatFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {SeatFormValuesSchema} from "@/pages/seats/schema/form/SeatForm.schema.ts";
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

/**
 * Props for {@link SeatSubmitFormView}.
 *
 * @template TEntity - The entity type being modified (normally {@link Seat}).
 * @template TForm - The form submission DTO (normally {@link SeatForm}).
 * @template TFormValues - The React Hook Form value type (normally {@link SeatFormValues}).
 *
 * @property className - Optional CSS class for the root form container.
 * @property disableFields - Optional list of `SeatFormValues` keys to disable. Disabled fields
 * are removed from the rendered form entirely.
 */
type FormProps = FormViewProps<Seat, SeatForm, SeatFormValues> & {
    /**
     * Optional additional class for custom layout/styling.
     */
    className?: string;

    /**
     * A list of keys from `SeatFormValues` specifying which form fields
     * should be disabled and not rendered.
     */
    disableFields?: (keyof SeatFormValues)[];
};

/**
 * @component SeatSubmitFormView
 *
 * @description
 * Renders a structured React Hook Form for managing `Seat` data, broken into logical fieldsets.
 * The form auto-determines which inputs are active based on:
 * - The Zod schema (`SeatFormValuesSchema`)
 * - The optional `disableFields` array
 *
 * It also respects mutation state from React Query:
 * - Submit button is disabled during pending mutations and after successful submission.
 *
 * @param props - See {@link FormProps}.
 *
 * @returns A fully rendered seat form with dynamic sections.
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
    const {className, form, mutation, submitHandler, disableFields} = props;

    const {isPending} = mutation;

    // Determine which fields to render based on schema + disables
    const activeFields = getActiveSchemaInputFields({
        schema: SeatFormValuesSchema,
        disableFields,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-4", className)}>
                {
                    (activeFields["theatre"] || activeFields["screen"]) &&
                    <SeatSubmitFormDetailsFieldset form={form} activeFields={activeFields}/>
                }

                {
                    (activeFields["row"] || activeFields["seatNumber"] || activeFields["seatLabel"]) &&
                    <SeatSubmitFormRowFieldset form={form} activeFields={activeFields}/>
                }

                {
                    (activeFields["x"] || activeFields["y"]) &&
                    <SeatSubmitFormCoordinateFieldset form={form} activeFields={activeFields}/>
                }

                {
                    (activeFields["seatType"] || activeFields["priceMultiplier"] || activeFields["isAvailable"]) &&
                    <SeatSubmitFormSeatFieldset form={form} activeFields={activeFields}/>
                }

                <Button
                    variant="default"
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default SeatSubmitFormView;
