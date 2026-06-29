/**
 * @file React context for MovieReview submit form state.
 * MovieReviewSubmitFormContext.ts
 */

import {createContext} from "react";
import {FormViewMutationStates, FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";
import {MovieReviewFormValues} from "@/domains/movie-reviews/_feat/submit-form/schema/MovieReviewFormSchema.ts";

/**
 * Context contract for MovieReview submit form consumers.
 */
export type MovieReviewSubmitFormContextValues = {
    formID: string;
    mutationState?: FormViewMutationStates;
    options?: FormViewOptions<MovieReviewFormValues>;
};

/**
 * MovieReview submit form context instance.
 */
export const MovieReviewSubmitFormViewContext =
    createContext<MovieReviewSubmitFormContextValues | undefined>(undefined);