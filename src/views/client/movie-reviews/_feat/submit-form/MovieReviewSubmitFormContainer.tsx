/**
 * @fileoverview Logical container for managing Movie Review form state and submission mutations.
 */

import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {MovieReviewForm, MovieReviewFormValues} from "@/domains/review/schemas/forms/MovieReviewForm.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMovieReviewSubmitForm} from "@/domains/review/forms/submit-form/useMovieReviewSubmitForm.ts";
import {
    useSubmitUserMovieReviewMutation
} from "@/domains/review/mutations/user-movie-review-submit/useSubmitUserMovieReviewMutation.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {ReactElement, ReactNode} from "react";
import MovieReviewSubmitFormViewContextProvider
    from "@/domains/review/context/submit-form-view-context/MovieReviewSubmitFormViewContextProvider.tsx";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {MovieReview} from "@/domains/review/schemas/models";
import {MutationResponseConfig} from "@/common/_feat/submit-data";

/** Props for the MovieReviewSubmitFormContainer component. */
type FormProps = MutationResponseConfig<MovieReview> & FormOptions<MovieReviewFormValues, MovieReviewForm, MovieReview> &
    {
        children: ReactNode;
        movieID: ObjectId;
        formKey?: string;
    };

/** Orchestrates the logic for creating or updating a Movie Review. */
export function MovieReviewSubmitFormContainer(
    params: FormProps
): ReactElement {
    const {
        children,
        movieID,
        disableFields,
        presetValues,
        resetOnSubmit,
        isPanel,
        editEntity,
        formKey,
        ...onSubmitProps
    } = params;

    const formID = `movie-review-submit-form-${formKey ?? "key"}`;

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
                <form
                    id={formID}
                    onSubmit={form.handleSubmit(
                        handleSubmit,
                        (errors) => console.error("Form Errors: ", {formID, errors})
                    )}
                >
                    {children}
                </form>
            </Form>
        </MovieReviewSubmitFormViewContextProvider>
    );
}