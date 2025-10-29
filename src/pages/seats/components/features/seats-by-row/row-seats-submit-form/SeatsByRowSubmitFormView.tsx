import {FC} from 'react';
import {SeatsByRowForm, SeatsByRowFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Button} from "@/common/components/ui/button.tsx";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";
import ScreenHookFormSelect from "@/pages/screens/components/submit-form/inputs/ScreenHookFormSelect.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/HookFormCheckbox.tsx";
import {Loader} from "lucide-react";
import SeatTypeHookFormSelect from "@/pages/seats/components/forms/inputs/SeatTypeHookFormSelect.tsx";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";

/**
 * Props for the {@link SeatsByRowSubmitFormView} component.
 */
type ViewProps = FormViewProps<Seat[], SeatsByRowForm, SeatsByRowFormValues> & {
    /** Optional array of form field keys to disable in the UI. */
    disableFields?: (keyof SeatsByRowFormValues)[];

    /** Optional CSS class applied to the form wrapper. */
    className?: string;
};

/**
 * Form view component for submitting seats by row.
 *
 * Renders all seat-related input fields, dynamically disables fields based
 * on `disableFields`, and integrates with React Hook Form and React Query
 * for form state and mutation handling.
 *
 * Fields include:
 * - Theatre (select)
 * - Screen (select, depends on selected theatre)
 * - Row
 * - Y-Axis
 * - Number of Seats
 * - Seat Type (select)
 * - Price Multiplier
 * - Availability checkbox
 *
 * Displays a submit button with a loading state while mutation is pending.
 *
 * @param props - {@link ViewProps}
 *
 * @example
 * ```tsx
 * <SeatsByRowSubmitFormView
 *   form={form}
 *   mutation={mutation}
 *   submitHandler={onFormSubmit}
 *   disableFields={['row', 'y']}
 *   className="p-4 bg-white"
 * />
 * ```
 */
const SeatsByRowSubmitFormView: FC<ViewProps> = (props) => {
    const {form, disableFields, submitHandler, className, mutation: {isPending}} = props;

    const activeFields = {
        row: !disableFields?.includes("row"),
        numberOfSeats: !disableFields?.includes("numberOfSeats"),
        y: !disableFields?.includes("y"),
        theatre: !disableFields?.includes("theatre"),
        screen: !disableFields?.includes("screen"),
        seatType: !disableFields?.includes("seatType"),
        isAvailable: !disableFields?.includes("isAvailable"),
        priceMultiplier: !disableFields?.includes("priceMultiplier"),
    };

    const theatre = form.watch("theatre");
    const hasTheatre = theatre !== null && theatre !== undefined && theatre !== "";

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-4", className)}>
                {activeFields["theatre"] && (
                    <TheatreHookFormSelect
                        name="theatre"
                        label="Theatre"
                        control={form.control}
                    />
                )}

                {hasTheatre && activeFields["screen"] && (
                    <ScreenHookFormSelect
                        name="screen"
                        label="Screen"
                        filters={{theatre}}
                        control={form.control}
                    />
                )}

                {activeFields["row"] && (
                    <HookFormInput
                        name="row"
                        label="Row"
                        control={form.control}
                    />
                )}

                {activeFields["y"] && (
                    <HookFormInput
                        name="y"
                        label="Y-Axis"
                        type="number"
                        min={1}
                        step={1}
                        control={form.control}
                    />
                )}

                {activeFields["numberOfSeats"] && (
                    <HookFormInput
                        name="numberOfSeats"
                        label="Number Of Seats"
                        type="number"
                        min={1}
                        step={1}
                        control={form.control}
                    />
                )}

                {activeFields["priceMultiplier"] && (
                    <HookFormInput
                        name="priceMultiplier"
                        label="Price Multiplier"
                        control={form.control}
                    />
                )}

                {activeFields["seatType"] && (
                    <SeatTypeHookFormSelect
                        name="seatType"
                        label="Seat Type"
                        control={form.control}
                    />
                )}

                {activeFields["priceMultiplier"] && (
                    <HookFormCheckbox
                        name="isAvailable"
                        label="Is Available?"
                        control={form.control}
                    />
                )}

                <Button variant="default" disabled={isPending} className="w-full bg-primary">
                    {isPending ? <Loader/> : "Submit"}
                </Button>
            </form>
        </Form>
    );
};

export default SeatsByRowSubmitFormView;
