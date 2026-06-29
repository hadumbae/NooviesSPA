/** @fileoverview Hook for initializing and managing the movie credit submission form state. */


import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormValuesConfig} from "@/common/_feat/submit-data";
import {MovieCredit} from "@/domains/movie-credits/_schemas";
import {
    MovieCreditFormData,
    MovieCreditFormSchema,
    MovieCreditFormValues
} from "@/domains/movie-credits/_feat/submit-data/schemas";
import {
    useMovieCreditSubmitFormDefaultValues
} from "@/domains/movie-credits/_feat/submit-data/hooks/useMovieCreditSubmitFormDefaultValues.ts";

/**
 * Initialises a React Hook Form instance for creating or updating movie credits.
 */
export function useMovieCreditSubmitForm(
    params?: FormValuesConfig<MovieCreditFormValues, MovieCredit>
): UseFormReturn<MovieCreditFormValues, unknown, MovieCreditFormData> {
    const defaultValues = useMovieCreditSubmitFormDefaultValues(params);

    return useForm<MovieCreditFormValues, unknown, MovieCreditFormData>({
        resolver: zodResolver(MovieCreditFormSchema),
        defaultValues,
    });
}