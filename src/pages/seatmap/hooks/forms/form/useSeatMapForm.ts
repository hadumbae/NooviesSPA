/**
 * @file useSeatMapForm.ts
 *
 * @summary React hook for initializing and configuring the SeatMap form.
 *
 * @description
 * Provides a single entry point for setting up a Seat Map form in both creation
 * and edit flows. The hook:
 * - Resolves default values from schema defaults, an optional existing {@link SeatMap},
 *   and optional preset overrides using {@link useSeatMapFormDefaultValues}.
 * - Integrates Zod-based validation via {@link SeatMapFormSchema}.
 * - Returns the full React Hook Form API for controlling and submitting the form.
 *
 * Supports strong typing of form values and ensures consistent defaults
 * across the application.
 */

import { SeatMap } from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import { SeatMapFormValues } from "@/pages/seatmap/schema/form/SeatMapForm.types.ts";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SeatMapFormSchema } from "@/pages/seatmap/schema/form/SeatMapForm.schema.ts";
import useSeatMapFormDefaultValues from "@/pages/seatmap/hooks/forms/form/useSeatMapFormDefaultValues.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Parameters for {@link useSeatMapForm}.
 */
type FormParams = {
    /**
     * Optional partial values that override computed default values.
     *
     * Applied after schema and SeatMap-derived defaults.
     */
    presetValues?: Partial<SeatMapFormValues>;

    /**
     * Optional existing SeatMap used to prefill the form.
     *
     * Typically provided when editing an existing seat map.
     */
    seatMap?: SeatMap;

    /**
     * The ID of the showing this SeatMap belongs to.
     */
    showingID: ObjectId;
};

/**
 * React hook for initializing a SeatMap form with defaults and validation.
 *
 * @param params - Parameters to configure the form's initial values and overrides.
 *
 * @returns
 * A {@link UseFormReturn} object from React Hook Form, configured for the SeatMap form.
 *
 * @example
 * ```ts
 * const form = useSeatMapForm({
 *   seatMap: existingSeatMap,
 *   presetValues: { basePrice: "120" },
 *   showingID: "showing123",
 * });
 * ```
 */
export default function useSeatMapForm(
    params: FormParams
): UseFormReturn<SeatMapFormValues> {
    const defaultValues = useSeatMapFormDefaultValues(params);

    return useForm<SeatMapFormValues>({
        resolver: zodResolver(SeatMapFormSchema),
        defaultValues,
    });
}
