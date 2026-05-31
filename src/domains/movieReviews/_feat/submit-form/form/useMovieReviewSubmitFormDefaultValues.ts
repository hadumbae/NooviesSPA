/**
 * @fileoverview Hook for resolving default values in the movie review submit form.
 *
 */

import {useContext, useRef} from "react";
import {isEqual} from "lodash";
import {AuthContext} from "@/domains/auth/context/AuthContext.ts";

import {MovieReview} from "@/domains/movieReviews/schemas/model";
import {MovieReviewFormValues} from "@/domains/movieReviews/_feat/submit-form/schema/MovieReviewFormSchema.ts";

/** Parameters for initializing movie review form defaults. */
type FormParams = {
    presetValues?: Partial<MovieReviewFormValues>;
    movieReview?: MovieReview;
}

/** Provides stable default values for the movie review form. */
export function useMovieReviewSubmitFormDefaultValues(
    {presetValues, movieReview}: FormParams
): MovieReviewFormValues {
    const userContext = useContext(AuthContext);

    const heldValues = {
        movie: undefined,
        displayName: userContext?.user?.name ?? "",
        summary: "",
        reviewText: "",
        isRecommended: false,
        rating: "",
        ...movieReview,
        ...presetValues,
    };

    const defaultValues = useRef<MovieReviewFormValues>(heldValues);

    if (isEqual(heldValues, defaultValues.current)) {
        defaultValues.current = heldValues;
    }

    return defaultValues.current;
}