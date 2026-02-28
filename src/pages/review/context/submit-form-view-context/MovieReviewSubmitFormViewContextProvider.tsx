/**
 * @file Provider for MovieReview submit form view context.
 * MovieReviewSubmitFormViewContextProvider.tsx
 */

import {UseMutationResult} from "@tanstack/react-query";
import {MovieReviewForm, MovieReviewFormValues} from "@/pages/review/schemas/forms/MovieReviewForm.types.ts";
import {PopulatedMovieReview} from "@/pages/review/schemas/models/MovieReview.types.ts";
import {ReactNode} from "react";
import {FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";
import {
    MovieReviewSubmitFormViewContext,
    MovieReviewSubmitFormContextValues
} from "@/pages/review/context/submit-form-view-context/MovieReviewSubmitFormViewContext.ts";

/**
 * Props for MovieReviewSubmitFormViewContextProvider.
 */
type ProviderProps = FormViewOptions<MovieReviewFormValues> & {
    children: ReactNode;
    mutation: UseMutationResult<PopulatedMovieReview, unknown, MovieReviewForm>;
};

/**
 * Provides mutation state and view-layer options
 * to MovieReview submit form view consumers.
 */
const MovieReviewSubmitFormViewContextProvider = (
    {children, mutation, ...options}: ProviderProps
) => {
    const {isSuccess, isPending, isError, error, reset} = mutation;

    const values: MovieReviewSubmitFormContextValues = {
        options,
        mutationState: {isSuccess, isPending, isError, error, reset},
    }

    return (
        <MovieReviewSubmitFormViewContext.Provider value={values}>
            {children}
        </MovieReviewSubmitFormViewContext.Provider>
    );
};

export default MovieReviewSubmitFormViewContextProvider;