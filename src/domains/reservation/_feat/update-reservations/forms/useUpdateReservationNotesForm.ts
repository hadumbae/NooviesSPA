/**
 * @fileoverview Hook for managing the reservation notes update form state.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    UpdateReservationNotesFormData,
    UpdateReservationNotesFormDataSchema,
    UpdateReservationNotesFormValues
} from "@/domains/reservation/_feat/update-reservations/forms/formSchema.ts";

/** Parameters for the useUpdateReservationNotesForm hook. */
type FormParams = {
    presetValues?: Partial<UpdateReservationNotesFormValues>;
}

/** Configures react-hook-form for reservation note updates. */
export function useUpdateReservationNotesForm(
    {presetValues}: FormParams = {}
): UseFormReturn<UpdateReservationNotesFormData, unknown, UpdateReservationNotesFormValues> {
    const defaultValues: UpdateReservationNotesFormValues = {
        notes: "",
        ...presetValues,
    };

    return useForm({
        resolver: zodResolver(UpdateReservationNotesFormDataSchema),
        defaultValues,
        mode: "onSubmit",
    });
}