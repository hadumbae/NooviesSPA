/**
 * @fileoverview Composed form hook for ticket reservation workflows.
 *
 * Provides a React Hook Form instance bound to the reservation schema.
 */

import {useReserveTicketFormDefaultValues} from "@/domains/reservation/_feat/reserve-tickets/forms/useReserveTicketFormDefaultValues.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    ReserveTicketFormData,
    ReserveTicketFormSchema,
    ReserveTicketFormValues
} from "@/domains/reservation/_feat/reserve-tickets/schema/ReserveTicketFormSchema.ts";

/** Props for the useReserveTicketForm hook. */
type FormProps = {
    presetValues?: Partial<ReserveTicketFormValues>;
};

/** Creates a fully configured reservation form instance. */
export function useReserveTicketForm(
    {presetValues}: FormProps = {}
): UseFormReturn<ReserveTicketFormValues, unknown, ReserveTicketFormData> {
    const defaultValues = useReserveTicketFormDefaultValues({presetValues});

    return useForm<ReserveTicketFormValues, unknown, ReserveTicketFormData>({
        resolver: zodResolver(ReserveTicketFormSchema),
        defaultValues,
    });
}
