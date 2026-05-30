/**
 * @fileoverview Hook for managing the reservation notes update form state.
 *
 */
import {useMemo} from "react";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    UpdateReservationNotesFormSubmit, UpdateReservationNotesFormSubmitSchema,
    UpdateReservationNotesFormValues
} from "@/domains/reservation/_feat/update-reservations/hooks/forms/formSchema.ts";

/** Parameters for the useUpdateReservationNotesForm hook. */
type FormParams = {
    presetValues?: Partial<UpdateReservationNotesFormValues>;
}

/** Configures react-hook-form for reservation note updates. */
export function useUpdateReservationNotesForm(
    {presetValues}: FormParams = {}
): UseFormReturn<UpdateReservationNotesFormSubmit, unknown, UpdateReservationNotesFormValues> {
    const defaultValues: UpdateReservationNotesFormValues = useMemo(() => ({
        notes: "",
        ...presetValues,
    }), [presetValues]);

    return useForm({
        resolver: zodResolver(UpdateReservationNotesFormSubmitSchema),
        defaultValues,
        mode: "onSubmit",
    });
}