/**
 * @file React context for MovieReview submit form state.
 * MovieReviewSubmitFormContext.ts
 */

import {createContext} from "react";
import {MovieReviewFormValues} from "@/pages/review/schemas/forms/MovieReviewForm.types.ts";
import {FormViewMutationStates, FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";

/**
 * Context contract for MovieReview submit form consumers.
 */
export type MovieReviewSubmitFormContextValues = {
    mutationState?: FormViewMutationStates;
    options?: FormViewOptions<MovieReviewFormValues>;
};

/**
 * MovieReview submit form context instance.
 */
export const MovieReviewSubmitFormViewContext =
    createContext<MovieReviewSubmitFormContextValues | undefined>(undefined);