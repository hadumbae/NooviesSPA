/**
 * @file useShowingSubmitForm.ts
 *
 * Custom hook for initializing a `react-hook-form` instance used to
 * create or edit a Showing.
 *
 * Features:
 * - Integrates `zodResolver` with {@link ShowingFormSchema} for validation
 * - Computes `defaultValues` via {@link useShowingSubmitFormDefaultValues}
 * - Supports both create and edit workflows through a single API
 * - Returns a fully typed `UseFormReturn<ShowingFormValues>`
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ShowingFormValuesConfig} from "@/domains/showings/_feat/submit-data/useShowingSubmitForm.types.ts";
import {
    useShowingSubmitFormDefaultValues
} from "@/domains/showings/_feat/submit-data/useShowingSubmitFormDefaultValues.ts";
import {ShowingFormValues} from "@/domains/showings/schema/form/form-values/ShowingFormValues.ts";
import {ShowingFormData, ShowingFormSchema} from "@/domains/showings/schema/form";

export function useShowingSubmitForm(
    params: ShowingFormValuesConfig
): UseFormReturn<ShowingFormValues, unknown, ShowingFormData> {
    const defaultValues = useShowingSubmitFormDefaultValues(params);

    return useForm<ShowingFormValues, unknown, ShowingFormData>({
        resolver: zodResolver(ShowingFormSchema),
        defaultValues,
    });
}
