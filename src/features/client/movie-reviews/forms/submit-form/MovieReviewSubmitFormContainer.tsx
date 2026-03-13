/**
 * @file Container component for MovieReview submit form flows.
 * MovieReviewSubmitFormContainer.tsx
 */

import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {MovieReview, PopulatedMovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReviewForm, MovieReviewFormValues} from "@/domains/review/schemas/forms/MovieReviewForm.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMovieReviewSubmitForm} from "@/domains/review/forms/submit-form/useMovieReviewSubmitForm.ts";
import {
    useSubmitUserMovieReviewMutation
} from "@/domains/review/mutations/user-movie-review-submit/useSubmitUserMovieReviewMutation.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {ReactNode} from "react";
import MovieReviewSubmitFormViewContextProvider
    from "@/domains/review/context/submit-form-view-context/MovieReviewSubmitFormViewContextProvider.tsx";
import Logger from "@/common/utility/features/logger/Logger.ts";

/**
 * Props for MovieReviewSubmitFormContainer.
 *
 * Combines submit handlers, form configuration, and movie context.
 */
type FormProps =
    MutationOnSubmitParams<PopulatedMovieReview> &
    FormOptions<MovieReviewFormValues, MovieReviewForm, MovieReview> &
    {
        children: ReactNode;
        movieID: ObjectId;
    };

/**
 * Orchestrates MovieReview create/edit submission flow.
 *
 * Binds form state, submit mutation, and view context.
 */
const MovieReviewSubmitFormContainer = (params: FormProps) => {
    const {
        children,
        movieID,
        disableFields,
        presetValues,
        resetOnSubmit,
        isPanel,
        editEntity,
        ...onSubmitProps
    } = params;

    const formID = "movie-review-submit-form";

    const form = useMovieReviewSubmitForm({
        movieReview: editEntity,
        presetValues: {
            ...presetValues,
            movie: movieID,
        },
    });

    const mutation = useSubmitUserMovieReviewMutation({
        form,
        editID: editEntity?._id,
        onSubmit: onSubmitProps,
    });

    const handleSubmit = (values: MovieReviewFormValues) => {
        Logger.log({
            type: "DATA",
            msg: "Submit data for movie review for current user.",
            context: {values},
        });

        mutation.mutate(values as MovieReviewForm);
    }

    return (
        <MovieReviewSubmitFormViewContextProvider
            formID={formID}
            mutation={mutation}
            disableFields={disableFields}
            isPanel={isPanel}
            isEditing={!!editEntity}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(
                    handleSubmit,
                    (errors) => console.error("Form Errors: ", {formID, errors})
                )}>
                    {children}
                </form>
            </Form>
        </MovieReviewSubmitFormViewContextProvider>
    );
};

export default MovieReviewSubmitFormContainer;