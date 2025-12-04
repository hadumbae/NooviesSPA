/**
 * @file useSeatSubmitForm.ts
 *
 * @summary
 * Custom React hook for creating and managing a seat submission form.
 * Integrates React Hook Form with Zod schema validation to provide a type-safe,
 * validated form for adding or editing seats.
 *
 * @description
 * Default values are applied in the following priority:
 * 1. Hardcoded defaults (e.g., `layoutType: "SEAT"`, `x: 1`, `y: 1`)
 * 2. Values from an existing `seat` object (editing mode)
 * 3. Preset values passed via `presetValues`
 *
 * The hook automatically validates against {@link SeatFormSchema}.
 */

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SeatFormSchema } from "@/pages/seats/schema/form/SeatForm.schema.ts";
import { Seat } from "@/pages/seats/schema/seat/Seat.types.ts";
import { SeatFormValues } from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import useSeatSubmitFormDefaultValues
    from "@/pages/seats/hooks/features/admin/submit-seat-data/useSeatSubmitFormDefaultValues.ts";

/**
 * Configuration parameters for {@link useSeatSubmitForm}.
 */
export type SeatFormParams = {
    /**
     * Optional preset values to initialize the form.
     * Overrides the default values for specific fields.
     */
    presetValues?: Partial<SeatFormValues>;

    /**
     * Optional seat object used to populate the form for editing.
     * Fields from `seat` override defaults but can be further overridden
     * by `presetValues`.
     */
    seat?: Seat;
};

/**
 * React hook for creating and managing a seat submission form.
 *
 * @template TFormValues - Type of the form values (usually {@link SeatFormValues}).
 *
 * @param params - Optional configuration object containing preset values and/or a seat object.
 *
 * @returns `UseFormReturn<TFormValues>` — the React Hook Form instance for managing
 *          values, validation, and submission.
 *
 * @example
 * ```ts
 * // Creating a new seat form with defaults
 * const form = useSeatSubmitForm();
 *
 * // Creating a form with preset values
 * const formWithPreset = useSeatSubmitForm({
 *   presetValues: { row: "A", seatNumber: 10 },
 * });
 *
 * // Editing an existing seat
 * const formEditing = useSeatSubmitForm({
 *   seat: existingSeat,
 * });
 *
 * // Access form state and values
 * console.log(form.getValues());
 * form.setValue("seatType", "VIP");
 * ```
 */
export default function useSeatSubmitForm(params: SeatFormParams = {}): UseFormReturn<SeatFormValues> {
    // ⚡ Get Default Values ⚡

    const defaultValues: SeatFormValues = useSeatSubmitFormDefaultValues(params);

    return useForm<SeatFormValues>({
        resolver: zodResolver(SeatFormSchema),
        defaultValues,
    });
}
