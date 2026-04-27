/** @fileoverview Hook for initializing and managing the movie credit submission form state. */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {useMovieCreditSubmitFormDefaultValues}
    from "@/domains/moviecredit/_feat/submit-data/useMovieCreditSubmitFormDefaultValues.ts";
import {MovieCredit} from "@/domains/moviecredit/schemas/model/MovieCreditSchema.ts";
import {MovieCreditFormValues} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormValues.ts";
import {
    MovieCreditFormData,
    MovieCreditFormSchema
} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormSchema.ts";

/** Parameters for the useMovieCreditSubmitForm hook. */
type SubmitParams = {
    credit?: MovieCredit;
    presetValues?: Partial<MovieCreditFormValues>;
}

/**
 * Initializes a React Hook Form instance for creating or updating movie credits.
 */
export function useMovieCreditSubmitForm(
    params?: SubmitParams
): UseFormReturn<MovieCreditFormValues, unknown, MovieCreditFormData> {
    const defaultValues = useMovieCreditSubmitFormDefaultValues(params);

    return useForm<MovieCreditFormValues, unknown, MovieCreditFormData>({
        resolver: zodResolver(MovieCreditFormSchema),
        defaultValues,
    });
}