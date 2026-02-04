/**
 * @file useReserveTicketForm.ts
 *
 * Composed form hook for ticket reservation workflows.
 *
 * Responsibilities:
 * - Derive stable default values for the reservation form
 * - Bind schema-based validation via Zod
 * - Expose a fully configured React Hook Form instance
 *
 * Intended as the single entry point for creating
 * a reservation form in UI components.
 */

import {useReserveTicketFormDefaultValues} from "@/pages/reservation/forms/useReserveTicketFormDefaultValues.ts";
import {ReserveTicketFormValues} from "@/pages/reservation/schema/forms/ReserveTicketFormValuesSchema.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReserveTicketFormSchema} from "@/pages/reservation/schema/forms/ReserveTicketFormSchema.ts";

type FormProps = {
    /**
     * Optional preset values used to prefill the form.
     *
     * Useful for:
     * - editing an existing reservation
     * - restoring interrupted flows
     * - server-provided defaults
     */
    presetValues?: Partial<ReserveTicketFormValues>;
};

/**
 * Creates a fully configured reservation form instance.
 *
 * @param props - Form initialization options
 *
 * @returns React Hook Form instance bound to
 * `ReserveTicketFormSchema` validation.
 */
export function useReserveTicketForm(
    {presetValues}: FormProps = {}
): UseFormReturn<ReserveTicketFormValues> {
    const defaultValues = useReserveTicketFormDefaultValues({presetValues});

    return useForm<ReserveTicketFormValues>({
        resolver: zodResolver(ReserveTicketFormSchema),
        defaultValues,
    });
}
