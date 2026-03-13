/**
 * @file Hook for resolving default values in the movie review submit form.
 * useMovieReviewSubmitFormDefaultValues.ts
 */

import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {MovieReviewFormValues} from "@/domains/review/schemas/forms/MovieReviewForm.types.ts";
import {useContext, useMemo, useRef} from "react";
import {isEqual} from "lodash";
import {AuthContext} from "@/domains/auth/context/AuthContext.ts";

/**
 * Parameters for initializing movie review form defaults.
 */
type FormParams = {
    presetValues?: Partial<MovieReviewFormValues>;
    movieReview?: MovieReview;
}

/**
 * Provides stable default values for the movie review form.
 */
export function useMovieReviewSubmitFormDefaultValues(
    {presetValues, movieReview}: FormParams
): MovieReviewFormValues {
    const defaultValues = useRef<MovieReviewFormValues | null>(null);
    const userContext = useContext(AuthContext);

    const initialValues = useMemo(() => ({
        movie: undefined,
        displayName: userContext?.user?.name ?? "",
        summary: "",
        reviewText: "",
        isRecommended: false,
        rating: "",
        ...movieReview,
        ...presetValues,
    }), [movieReview, presetValues]);

    if (isEqual(initialValues, defaultValues.current)) {
        defaultValues.current = initialValues;
    }

    return defaultValues.current ?? initialValues;
}