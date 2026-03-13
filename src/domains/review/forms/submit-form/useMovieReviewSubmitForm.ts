/**
 * @file Hook for configuring the movie review submit form.
 * useMovieReviewSubmitForm.ts
 */

import {MovieReviewFormValues} from "@/domains/review/schemas/forms/MovieReviewForm.types.ts";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {
    useMovieReviewSubmitFormDefaultValues
} from "@/domains/review/forms/submit-form/useMovieReviewSubmitFormDefaultValues.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MovieReviewFormSchema} from "@/domains/review/schemas/forms/MovieReviewForm.schema.ts";

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
): UseFormReturn<MovieReviewFormValues> {
    const defaultValues = useMovieReviewSubmitFormDefaultValues(params);

    return useForm<MovieReviewFormValues>({
        resolver: zodResolver(MovieReviewFormSchema),
        defaultValues,
    });
}