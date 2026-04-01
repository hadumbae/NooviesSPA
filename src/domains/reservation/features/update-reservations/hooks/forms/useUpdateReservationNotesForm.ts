/**
 * @file Specialized hook for managing the reservation notes update form state.
 * @filename useUpdateReservationNotesForm.ts
 */

import {
    UpdateReservationNotesFormSubmit,
    UpdateReservationNotesFormSubmitSchema,
} from "@/domains/reservation/features/update-reservations/schemas";
import {useMemo} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

/**
 * Parameters for initializing the reservation notes form.
 */
type FormParams = {
    /** * Initial values to populate the form fields.
     * Useful for editing existing notes.
     */
    presetValues?: Partial<UpdateReservationNotesFormSubmit>;
}

/**
 * A custom hook that configures `react-hook-form` for reservation note updates.
 * @param params - Configuration for default values and initial state.
 * @returns A fully configured `UseFormReturn` instance.
 */
export function useUpdateReservationNotesForm({presetValues}: FormParams = {}) {
    const defaultValues: UpdateReservationNotesFormSubmit = useMemo(() => ({
        notes: "",
        ...presetValues,
    }), [presetValues]);

    return useForm({
        resolver: zodResolver(UpdateReservationNotesFormSubmitSchema),
        defaultValues,
        mode: "onSubmit",
    });
}