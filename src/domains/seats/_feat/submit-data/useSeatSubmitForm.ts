/**
 * @fileoverview Hook for initializing a React Hook Form instance for seat creation and updates with Zod validation.
 */

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Seat } from "@/domains/seats/schema/seat/Seat.types.ts";
import {useSeatSubmitFormDefaultValues}
    from "@/domains/seats/_feat/submit-data/useSeatSubmitFormDefaultValues.ts";
import {SeatFormData, SeatFormSchema, SeatFormValues} from "@/domains/seats/_feat/submit-data/index.ts";

/** Props for the useSeatSubmitForm hook. */
export type SeatFormParams = {
    presetValues?: Partial<SeatFormValues>;
    seat?: Seat;
};

/**
 * Manages form state and validation logic for seat entities using a discriminated union schema.
 */
export function useSeatSubmitForm(
    params: SeatFormParams = {}
): UseFormReturn<SeatFormValues, unknown, SeatFormData> {
    const defaultValues: SeatFormValues = useSeatSubmitFormDefaultValues(params);

    return useForm<SeatFormValues, unknown, SeatFormData>({
        resolver: zodResolver(SeatFormSchema),
        defaultValues,
    });
}