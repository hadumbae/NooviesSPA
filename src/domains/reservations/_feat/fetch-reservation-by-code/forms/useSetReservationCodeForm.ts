/**
 * @fileoverview Custom React Hook Form initialization for reservation code lookups.
 */

import {
    FetchByCodeSearchParams,
} from "@/domains/reservations/_feat/fetch-reservation-by-code/schemas";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    SetReservationCodeFormData, SetReservationCodeFormSubmitSchema,
    SetReservationCodeFormValues
} from "@/domains/reservations/_feat/fetch-reservation-by-code";

/** Props for the useSetReservationCodeForm hook. */
type FormProps = {
    presetValues?: Partial<FetchByCodeSearchParams>;
}

/** Specialized hook for managing the reservation Fetch by Code search form state. */
export function useSetReservationCodeForm(
    {presetValues}: FormProps = {},
): UseFormReturn<SetReservationCodeFormValues, unknown, SetReservationCodeFormData> {
    return useForm<SetReservationCodeFormValues, unknown, SetReservationCodeFormData>({
        resolver: zodResolver(SetReservationCodeFormSubmitSchema),
        defaultValues: {
            code: presetValues?.code ?? "",
        },
    });
}