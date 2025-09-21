import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SeatsByRowFormSchema } from "@/pages/seats/schema/form/SeatForm.schema.ts";
import { SeatsByRowFormValues } from "@/pages/seats/schema/form/SeatForm.types.ts";

/**
 * Parameters for configuring the seats-by-row submission form.
 */
type SubmitFormParams = {
    /**
     * Optional preset values to initialize the form fields.
     * Can include partial values for any of the `SeatsByRowFormValues` fields.
     */
    presetValues?: Partial<SeatsByRowFormValues>;
};

/**
 * Custom hook for creating and managing a seats-by-row submission form using React Hook Form.
 *
 * Features:
 * - Initializes default values from `presetValues` or uses hardcoded defaults.
 * - Integrates Zod schema validation via `zodResolver` for full form validation.
 * - Designed for bulk row seat creation, including `numberOfSeats` field.
 *
 * @param params - Optional configuration object with `presetValues`.
 * @returns A `UseFormReturn<SeatsByRowFormValues>` instance from React Hook Form.
 *
 * @example
 * ```ts
 * const form = useSeatsByRowSubmitForm({
 *   presetValues: { row: "A", numberOfSeats: 10 },
 * });
 *
 * // Access form values
 * console.log(form.getValues());
 * ```
 */
export default function useSeatsByRowSubmitForm(
    { presetValues }: SubmitFormParams = {}
): UseFormReturn<SeatsByRowFormValues> {
    const defaultValues: SeatsByRowFormValues = {
        row: getDefaultValue(presetValues?.row, undefined, ""),
        numberOfSeats: getDefaultValue(presetValues?.numberOfSeats, undefined, ""),
        y: getDefaultValue(presetValues?.y, undefined, ""),
        theatre: getDefaultValue(presetValues?.theatre, undefined, undefined),
        screen: getDefaultValue(presetValues?.screen, undefined, undefined),
        seatType: getDefaultValue(presetValues?.seatType, undefined, undefined),
        isAvailable: getDefaultValue(presetValues?.isAvailable, undefined, true),
        priceMultiplier: getDefaultValue(presetValues?.priceMultiplier, undefined, ""),
    };

    return useForm<SeatsByRowFormValues>({
        resolver: zodResolver(SeatsByRowFormSchema),
        defaultValues,
    });
}
