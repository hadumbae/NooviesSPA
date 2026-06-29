/**
 * @fileoverview React hook for initializing and configuring the SeatMap form.
 */

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, UseFormReturn} from "react-hook-form";
import {SeatMap} from "@/domains/seatmaps/_schema";
import {SeatMapFormData, SeatMapFormSchema, SeatMapFormValues} from "@/domains/seatmaps/_feat/submit-data/schema";
import {useSeatMapFormDefaultValues} from "@/domains/seatmaps/_feat/submit-data/form/useSeatMapFormDefaultValues.ts";
import {FormValuesConfig} from "@/common/_feat/submit-data";

/** Initialises a React Hook Form instance for SeatMap data entry. */
export function useSeatMapForm(
    values: FormValuesConfig<SeatMapFormValues, SeatMap> = {}
): UseFormReturn<SeatMapFormValues, unknown, SeatMapFormData> {
    const defaultValues = useSeatMapFormDefaultValues(values);

    return useForm<SeatMapFormValues, unknown, SeatMapFormData>({
        resolver: zodResolver(SeatMapFormSchema),
        defaultValues,
    });
}
