/**
 * @fileoverview Form wrapper for administrative operations that manually set or correct a movie review's rating.
 */

import {ReactElement, ReactNode, useId} from "react";
import {ObjectId} from "@/common/_schemas";
import {Form} from "@/views/common/_comp/ui/form.tsx";

import {MovieReview} from "@/domains/movie-reviews/_schema/model";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {
    SetReviewRatingFormData,
    useSetReviewRatingForm,
    useSetReviewRatingMutation
} from "@/domains/movie-reviews/_feat";
import {handleCustomerReviewFormSubmit} from "@/domains/customers";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";

/** Props for the SetReviewRatingForm component. */
type FormProps = MutationResponseConfig<MovieReview, SetReviewRatingFormData> & MutationFormResetConfig & {
    children: ReactNode;
    reviewID: ObjectId;
    presetValues?: Partial<SetReviewRatingFormData>;
};

/**
 * Orchestrates the data flow and submission logic for administrative rating overrides.
 */
export function SetReviewRatingForm(
    {children, reviewID, presetValues, ...onSubmitConfig}: FormProps
): ReactElement {
    const id = useId();
    const formID = `set-review-rating-form-${id}`;

    const form = useSetReviewRatingForm({presetValues});
    const {mutateAsync, isPending, isError} = useSetReviewRatingMutation({reviewID});

    const setRating = async (values: SetReviewRatingFormData) => {
        await handleCustomerReviewFormSubmit({
            form,
            data: values,
            submitData: mutateAsync,
            ...onSubmitConfig,
        });
    };

    return (
        <BaseFormContextProvider formID={formID} isPending={isPending} isError={isError} submitHandler={setRating}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(setRating)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}