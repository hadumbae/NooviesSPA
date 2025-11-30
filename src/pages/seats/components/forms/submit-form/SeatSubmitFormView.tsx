/**
 * SeatSubmitFormView
 *
 * A presentational React component for rendering a form to create or update a `Seat`.
 * This component is designed to be used with React Hook Form and integrates seamlessly
 * with the `SeatSubmitFormContainer`.
 *
 * ### Features
 * - Dynamically renders form fields based on `SeatFormValuesSchema`.
 * - Supports disabling specific fields via `disableFields`.
 * - Conditionally renders dependent fields (e.g., `Screen` only when `theatre` is selected).
 * - Handles submission through a provided `submitHandler`.
 * - Integrates React Query mutation state to disable the submit button when pending or successful.
 */

import {cn} from "@/common/lib/utils.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";

import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";

import ScreenHookFormSelect from "@/pages/screens/components/submit-form/inputs/ScreenHookFormSelect.tsx";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";

import {SeatForm, SeatFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";
import SeatTypeHookFormSelect from "@/pages/seats/components/forms/inputs/SeatTypeHookFormSelect.tsx";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {SeatFormValuesSchema} from "@/pages/seats/schema/form/SeatForm.schema.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {FC} from "react";

/**
 * Props for {@link SeatSubmitFormView}.
 *
 * Extends {@link FormViewProps} with optional:
 * - `className` for custom styling.
 * - `disableFields` to disable specific input fields dynamically.
 *
 * @template TEntity - The seat entity type (usually {@link Seat}).
 * @template TForm - Form data type submitted (usually {@link SeatForm}).
 * @template TFormValues - React Hook Form values type (usually {@link SeatFormValues}).
 */
type FormProps = FormViewProps<Seat, SeatForm, SeatFormValues> & {
    /**
     * Optional CSS class for the root form container.
     */
    className?: string;

    /**
     * Array of field keys to disable in the form.
     * Fields not listed or undefined will be active.
     */
    disableFields?: (keyof SeatFormValues)[];
};

/**
 * SeatSubmitFormView
 *
 * Renders a fully-featured seat form for creating or updating seat records.
 *
 * ### Features
 * - Dynamically renders fields based on `SeatFormValuesSchema` and `disableFields`.
 * - Conditionally renders dependent fields, e.g., `Screen` depends on `Theatre`.
 * - Integrates with React Hook Form for validation and state management.
 * - Submit button is disabled while mutation is pending or already successful.
 *
 * @param props - Props including form instance, mutation state, submit handler, styling, and field configuration.
 *
 * @example
 * ```tsx
 * <SeatSubmitFormView
 *   form={form}
 *   mutation={mutation}
 *   submitHandler={onFormSubmit}
 *   disableFields={['row', 'seatNumber']}
 *   className="my-form-class"
 * />
 * ```
 */
const SeatSubmitFormView: FC<FormProps> = (props: FormProps) => {
    const {className, form, mutation, submitHandler, disableFields} = props;

    // Watch theatre selection to conditionally display the screen selector
    const theatre = form.watch("theatre");
    const {isPending, isSuccess} = mutation;

    // Determine which fields are active (not disabled)
    const activeFields = getActiveSchemaInputFields({schema: SeatFormValuesSchema, disableFields});

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-4", className)}>
                {activeFields["row"] && <HookFormInput name="row" label="Row" control={form.control}/>}

                {activeFields["seatNumber"] && (
                    <HookFormInput
                        name="seatNumber"
                        label="Seat Number"
                        type="number"
                        min={1}
                        step={1}
                        control={form.control}
                    />
                )}

                {activeFields["seatLabel"] && <HookFormInput name="seatLabel" label="Seat Label" control={form.control}/>}

                {activeFields["seatType"] && (
                    <SeatTypeHookFormSelect name="seatType" label="Seat Type" control={form.control}/>
                )}

                {activeFields["isAvailable"] && (
                    <HookFormCheckbox name="isAvailable" label="Is Available?" control={form.control}/>
                )}

                {activeFields["priceMultiplier"] && (
                    <HookFormInput
                        name="priceMultiplier"
                        label="Price Multiplier"
                        type="number"
                        min={0}
                        step={0.01}
                        control={form.control}
                    />
                )}

                {(activeFields["x"] || activeFields["y"]) && (
                    <fieldset
                        className={cn(
                            "grid gap-2",
                            activeFields["x"] && activeFields["y"] ? "grid-cols-2" : "grid-cols-1",
                        )}
                    >
                        {activeFields["x"] && (
                            <HookFormInput
                                name="x"
                                label="X Coordinate"
                                type="number"
                                min={1}
                                step={1}
                                control={form.control}
                            />
                        )}

                        {activeFields["y"] && (
                            <HookFormInput
                                name="y"
                                label="Y Coordinate"
                                type="number"
                                min={1}
                                step={1}
                                control={form.control}
                            />
                        )}
                    </fieldset>
                )}

                {activeFields["theatre"] && <TheatreHookFormSelect name="theatre" label="Theatre" control={form.control}/>}

                {activeFields["screen"] && theatre && (
                    <ScreenHookFormSelect name="screen" label="Screen" filters={{theatre}} control={form.control}/>
                )}

                <Button variant="default" type="submit" className="w-full" disabled={isPending || isSuccess}>
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default SeatSubmitFormView;
