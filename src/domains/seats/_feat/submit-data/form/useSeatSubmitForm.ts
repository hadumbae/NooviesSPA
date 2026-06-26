/**
 * @fileoverview Custom hook for managing the seat submission form state and validation.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Seat} from "@/domains/seats/_schema";
import {SeatFormData, SeatFormSchema, SeatFormValues} from "@/domains/seats/_feat/submit-data/schema";
import {useSeatSubmitFormDefaultValues} from "@/domains/seats/_feat/submit-data/form/useSeatSubmitFormDefaultValues.ts";
import {FormValuesConfig} from "@/common/_feat/submit-data";

/**
 * Initializes a React Hook Form instance for seat data with Zod schema validation.
 */
export function useSeatSubmitForm(
    params: FormValuesConfig<SeatFormValues, Seat> = {}
): UseFormReturn<SeatFormValues, unknown, SeatFormData> {
    const defaultValues: SeatFormValues = useSeatSubmitFormDefaultValues(params);

    return useForm<SeatFormValues, unknown, SeatFormData>({
        resolver: zodResolver(SeatFormSchema),
        defaultValues,
    });
}