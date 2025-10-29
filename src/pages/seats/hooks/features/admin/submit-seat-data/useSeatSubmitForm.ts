import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SeatFormSchema } from "@/pages/seats/schema/form/SeatForm.schema.ts";
import { Seat } from "@/pages/seats/schema/seat/Seat.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import { SeatFormValues } from "@/pages/seats/schema/form/SeatForm.types.ts";

/**
 * Parameters for configuring the seat submission form.
 */
type SeatFormParams = {
    /**
     * Optional preset values to initialize the form fields.
     */
    presetValues?: Partial<SeatFormValues>;

    /**
     * Optional seat object to populate form fields when editing an existing seat.
     */
    seat?: Seat;
};

/**
 * Custom hook for creating and managing a seat submission form using React Hook Form.
 *
 * Features:
 * - Initializes default values from `presetValues`, `seat` (for editing), or hardcoded defaults.
 * - Integrates Zod schema validation via `zodResolver`.
 *
 * @param params - Optional configuration object with `presetValues` and/or `seat`.
 * @returns A `UseFormReturn<SeatFormValues>` instance from React Hook Form.
 *
 * @example
 * ```ts
 * const form = useSeatSubmitForm({
 *   presetValues: { row: "A", seatNumber: "10" },
 *   seat: existingSeat,
 * });
 *
 * // Access form values
 * console.log(form.getValues());
 * ```
 */
export default function useSeatSubmitForm(
    params?: SeatFormParams
): UseFormReturn<SeatFormValues> {
    const { presetValues, seat } = params || {};

    const defaultValues: SeatFormValues = {
        row: getDefaultValue(presetValues?.row, seat?.row, ""),
        seatLabel: getDefaultValue(presetValues?.seatLabel, seat?.seatLabel, ""),
        seatNumber: getDefaultValue(presetValues?.seatNumber, seat?.seatNumber, ""),
        seatType: getDefaultValue(presetValues?.seatType, seat?.seatType, undefined),
        isAvailable: getDefaultValue(presetValues?.isAvailable, seat?.isAvailable, true),
        priceMultiplier: getDefaultValue(presetValues?.priceMultiplier, seat?.priceMultiplier, undefined),
        x: getDefaultValue(presetValues?.x, seat?.x, ""),
        y: getDefaultValue(presetValues?.y, seat?.y, ""),
        screen: getDefaultValue(presetValues?.screen, seat?.screen, undefined),
        theatre: getDefaultValue(presetValues?.theatre, seat?.theatre, undefined),
    };

    return useForm<SeatFormValues>({
        resolver: zodResolver(SeatFormSchema),
        defaultValues,
    });
}
