/**
 * @file Provider for MovieReview submit form view context.
 * MovieReviewSubmitFormViewContextProvider.tsx
 */

import {UseMutationResult} from "@tanstack/react-query";
import {ReactElement, ReactNode} from "react";
import {FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";
import {
    MovieReviewSubmitFormContextValues,
    MovieReviewSubmitFormViewContext
} from "@/domains/movieReviews/_feat/submit-form/context/MovieReviewSubmitFormViewContext.ts";
import {MovieReview} from "@/domains/movieReviews/schemas/model";
import {
    MovieReviewForm,
    MovieReviewFormValues
} from "@/domains/movieReviews/_feat/submit-form/schema/MovieReviewFormSchema.ts";

/**
 * Props for MovieReviewSubmitFormViewContextProvider.
 */
type ProviderProps = FormViewOptions<MovieReviewFormValues> & {
    children: ReactNode;
    formID: string;
    isEditing?: boolean;
    mutation: UseMutationResult<MovieReview, unknown, MovieReviewForm>;
};

/**
 * Provides mutation state and view-layer options
 * to MovieReview submit form view consumers.
 */
export function MovieReviewSubmitFormViewContextProvider(
    {children, formID, mutation, ...options}: ProviderProps
): ReactElement {
    const {isSuccess, isPending, isError, error, reset} = mutation;

    const values: MovieReviewSubmitFormContextValues = {
        formID,
        options,
        mutationState: {isSuccess, isPending, isError, error, reset},
    }

    return (
        <MovieReviewSubmitFormViewContext.Provider value={values}>
            {children}
        </MovieReviewSubmitFormViewContext.Provider>
    );
}

