/**
 * @fileoverview Hook for initializing a react-hook-form instance to create or edit a Showing.
 *
 * Integrates Zod validation and computes default values for the showing form.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ShowingFormValuesConfig} from "@/domains/showings/_feat/submit-data/useShowingSubmitForm.types.ts";
import {
    useShowingSubmitFormDefaultValues
} from "@/domains/showings/_feat/submit-data/useShowingSubmitFormDefaultValues.ts";
import {ShowingFormValues} from "@/domains/showings/_schema/form/form-values/ShowingFormValues.ts";
import {ShowingFormData, ShowingFormSchema} from "@/domains/showings/_schema/form";

/** Initializes the form state and validation schema for showing submission. */
export function useShowingSubmitForm(
    params: ShowingFormValuesConfig
): UseFormReturn<ShowingFormValues, unknown, ShowingFormData> {
    const defaultValues = useShowingSubmitFormDefaultValues(params);

    return useForm<ShowingFormValues, unknown, ShowingFormData>({
        resolver: zodResolver(ShowingFormSchema),
        defaultValues,
    });
}
