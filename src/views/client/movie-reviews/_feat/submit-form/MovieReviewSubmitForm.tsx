/**
 * @fileoverview Container for managing movie review form state and submission mutations.
 */

import {ObjectId} from "@/common/_schemas";
import {
    useSubmitUserMovieReviewMutation
} from "@/domains/movie-reviews/_feat/my-reviews/hooks/useSubmitUserMovieReviewMutation.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {ReactElement, ReactNode, useId} from "react";
import {Logger} from "@/common/_feat/logger/Logger.ts";
import {MovieReview} from "@/domains/movie-reviews/_schema/model";
import {FormOptions, MutationResponseConfig} from "@/common/_feat/submit-data";
import {
    MovieReviewForm,
    MovieReviewFormValues
} from "@/domains/movie-reviews/_feat/submit-form/schema/MovieReviewFormSchema.ts";
import {useMovieReviewSubmitForm} from "@/domains/movie-reviews/_feat/submit-form";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";

/** Props for the MovieReviewSubmitForm component. */
export type FormProps = FormOptions<MovieReviewFormValues, MovieReview> & {
    children: ReactNode;
    movieID: ObjectId;
    onSubmitConfig?: MutationResponseConfig<MovieReview>;
};

/** Orchestrates the logic for creating or updating a movie review. */
export function MovieReviewSubmitForm(
    {children, movieID, presetValues, editEntity, onSubmitConfig}: FormProps
): ReactElement {
    const id = useId();
    const formID = `movie-review-submit-form-${id}`;

    const form = useMovieReviewSubmitForm({
        movieReview: editEntity,
        presetValues: {...presetValues, movie: movieID},
    });

    const {mutate, isPending} = useSubmitUserMovieReviewMutation({form, onSubmitConfig});

    const handleSubmit = (values: MovieReviewForm) => {
        Logger.log({
            type: "DATA",
            msg: "Submit data for movie review for current user.",
            context: {values},
        });

        mutate(values as MovieReviewForm);
    }

    return (
        <BaseFormContextProvider formID={formID} isPending={isPending} submitHandler={handleSubmit}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(
                    handleSubmit,
                    (errors) => console.error("Form Errors: ", {formID, errors})
                )}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}