import { FC } from 'react';
import { cn } from "@/common/lib/utils.ts";
import { Form } from "@/common/components/ui/form.tsx";
import { Button } from "@/common/components/ui/button.tsx";

import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";

import ScreenHookFormSelect from "@/pages/screens/components/submit-form/inputs/ScreenHookFormSelect.tsx";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";

import { Seat } from "@/pages/seats/schema/seat/Seat.types.ts";
import { SeatForm, SeatFormValues } from "@/pages/seats/schema/form/SeatForm.types.ts";
import SeatTypeHookFormSelect from "@/pages/seats/components/forms/inputs/SeatTypeHookFormSelect.tsx";
import { FormViewProps } from "@/common/type/form/HookFormProps.ts";

/**
 * Props for SeatSubmitFormView component.
 *
 * Combines:
 * - React Hook Form integration via `FormViewProps` for form state and validation.
 * - Optional UI behavior: `className` for styling, `disableFields` to disable specific inputs.
 */
type FormProps = FormViewProps<Seat, SeatForm, SeatFormValues> & {
    /** Optional CSS class for the form container */
    className?: string;

    /** Optional array of field keys to disable in the form */
    disableFields?: (keyof SeatFormValues)[];
};

/**
 * SeatSubmitFormView
 *
 * A presentational form component for creating or editing a Seat.
 *
 * Features:
 * - Integrates React Hook Form for validation and state management.
 * - Conditionally disables fields based on `disableFields`.
 * - Updates the `screen` field dynamically when `theatre` changes.
 * - Provides a submit button that is disabled while submission is pending or successful.
 *
 * @param props - Props including form instance, mutation object, submit handler, and optional UI options.
 */
const SeatSubmitFormView: FC<FormProps> = (props) => {
    const {className, form, mutation, submitHandler, disableFields} = props;

    // Watch theatre selection to conditionally display the screen selector
    const theatre = form.watch("theatre");
    const { isPending, isSuccess } = mutation;

    // Determine which fields are active (not disabled)
    const activeFields = {
        row: !disableFields?.includes("row"),
        seatNumber: !disableFields?.includes("seatNumber"),
        seatLabel: !disableFields?.includes("seatLabel"),
        seatType: !disableFields?.includes("seatType"),
        isAvailable: !disableFields?.includes("isAvailable"),
        priceMultiplier: !disableFields?.includes("priceMultiplier"),
        x: !disableFields?.includes("x"),
        y: !disableFields?.includes("y"),
        theatre: !disableFields?.includes("theatre"),
        screen: !disableFields?.includes("screen"),
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-4", className)}>
                {activeFields["row"] && <HookFormInput name="row" label="Row" control={form.control}/>}

                {activeFields["seatNumber"] &&
                    <HookFormInput
                        name="seatNumber"
                        label="Seat Number"
                        type="number"
                        min={1}
                        step={1}
                        control={form.control}
                    />
                }

                {activeFields["seatLabel"] && <HookFormInput name="seatLabel" label="Seat Label" control={form.control}/>}

                {activeFields["seatType"] &&
                    <SeatTypeHookFormSelect name="seatType" label="Seat Type" control={form.control} />
                }

                {activeFields["isAvailable"] && <HookFormCheckbox name="isAvailable" label="Is Available?" control={form.control}/>}

                {activeFields["priceMultiplier"] &&
                    <HookFormInput
                        name="priceMultiplier"
                        label="Price Multiplier"
                        type="number"
                        min={0}
                        step={0.01}
                        control={form.control}
                    />
                }

                {(activeFields["x"] || activeFields["y"]) &&
                    <fieldset
                        className={cn(
                            "grid gap-2",
                            activeFields["x"] && activeFields["y"] ? "grid-cols-2" : "grid-cols-1",
                        )}
                    >
                        {activeFields["x"] &&
                            <HookFormInput name="x" label="X Coordinate" type="number" min={1} step={1} control={form.control}/>
                        }

                        {activeFields["y"] &&
                            <HookFormInput name="y" label="Y Coordinate" type="number" min={1} step={1} control={form.control}/>
                        }
                    </fieldset>
                }

                {activeFields["theatre"] && <TheatreHookFormSelect name="theatre" label="Theatre" control={form.control}/>}

                {(activeFields["screen"] && theatre) &&
                    <ScreenHookFormSelect name="screen" label="Screen" filters={{theatre}} control={form.control}/>
                }

                <Button variant="default" type="submit" className="w-full" disabled={isPending || isSuccess}>
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default SeatSubmitFormView;
