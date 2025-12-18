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
import {ShowingFormSchema} from "@/pages/showings/schema/form/ShowingForm.schema.ts";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";
import {UseShowingFormParams} from "@/pages/showings/hooks/forms/useShowingSubmitForm.types.ts";
import useShowingSubmitFormDefaultValues from "@/pages/showings/hooks/forms/useShowingSubmitFormDefaultValues.ts";

/**
 * Initializes a `react-hook-form` instance for the showing submit form.
 *
 * This hook abstracts form setup logic for both:
 * - Creating a new showing
 * - Editing an existing showing
 *
 * Validation is handled via Zod, and default values are resolved
 * dynamically based on the provided parameters.
 *
 * @param params - Parameters controlling form initialization
 * @returns A configured `react-hook-form` instance for showing submission
 *
 * @example
 * ```ts
 * const form = useShowingSubmitForm({
 *   showing: existingShowing,
 *   theatreTimezone: "Asia/Bangkok",
 *   presetValues: { language: "en" },
 * });
 *
 * <form onSubmit={form.handleSubmit(onSubmit)}>
 *   <input {...form.register("startAtDate")} />
 *   <input {...form.register("startAtTime")} />
 * </form>
 * ```
 */
export default function useShowingSubmitForm(
    params: UseShowingFormParams
): UseFormReturn<ShowingFormValues> {
    const defaultValues = useShowingSubmitFormDefaultValues(params);

    return useForm<ShowingFormValues>({
        resolver: zodResolver(ShowingFormSchema),
        defaultValues,
    });
}
