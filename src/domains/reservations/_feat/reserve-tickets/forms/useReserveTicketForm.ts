/**
 * @fileoverview Form hook for managing ticket reservation state and validation.
 *
 */

import {useReserveTicketFormDefaultValues} from "@/domains/reservations/_feat/reserve-tickets/forms/useReserveTicketFormDefaultValues.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    ReserveTicketFormData,
    ReserveTicketFormSchema,
    ReserveTicketFormValues
} from "@/domains/reservations/_feat/reserve-tickets/schema/ReserveTicketFormSchema.ts";

/** Props for the useReserveTicketForm hook. */
type FormProps = {
    presetValues?: Partial<ReserveTicketFormValues>;
};

/** Initializes a React Hook Form instance for ticket reservations using Zod validation. */
export function useReserveTicketForm(
    {presetValues}: FormProps = {}
): UseFormReturn<ReserveTicketFormValues, unknown, ReserveTicketFormData> {
    const defaultValues = useReserveTicketFormDefaultValues({presetValues});

    return useForm<ReserveTicketFormValues, unknown, ReserveTicketFormData>({
        resolver: zodResolver(ReserveTicketFormSchema),
        defaultValues,
    });
}
