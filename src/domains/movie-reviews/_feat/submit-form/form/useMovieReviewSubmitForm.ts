/**
 * @file Hook for configuring the movie review submit form.
 * useMovieReviewSubmitForm.ts
 */

import {
    useMovieReviewSubmitFormDefaultValues
} from "@/domains/movie-reviews/_feat/submit-form/form/useMovieReviewSubmitFormDefaultValues.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    MovieReviewForm,
    MovieReviewFormSchema,
    MovieReviewFormValues
} from "@/domains/movie-reviews/_feat/submit-form/schema/MovieReviewFormSchema.ts";

import {MovieReview} from "@/domains/movie-reviews/_schema/model";

/**
 * Parameters for configuring the movie review submit form.
 */
type FormParams = {
    presetValues?: Partial<MovieReviewFormValues>;
    movieReview?: MovieReview;
}

/**
 * Initializes and returns a configured movie review submit form instance.
 */
export function useMovieReviewSubmitForm(
    params: FormParams
): UseFormReturn<MovieReviewFormValues, unknown, MovieReviewForm> {
    const defaultValues = useMovieReviewSubmitFormDefaultValues(params);

    return useForm<MovieReviewFormValues, unknown, MovieReviewForm>({
        resolver: zodResolver(MovieReviewFormSchema),
        defaultValues,
    });
}