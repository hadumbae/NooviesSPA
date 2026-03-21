/**
 * @file Logical container for managing Movie Review form state and submission mutations.
 * @filename MovieReviewSubmitFormContainer.tsx
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
 * Combined properties for {@link MovieReviewSubmitFormContainer}.
 * * * **Mutation Params:** Inherits success/error callbacks via {@link MutationOnSubmitParams}.
 * * **Form Options:** Inherits configuration for field disabling and initial values via {@link FormOptions}.
 */
type FormProps =
    MutationOnSubmitParams<PopulatedMovieReview> &
    FormOptions<MovieReviewFormValues, MovieReviewForm, MovieReview> &
    {
        /** Form fields and UI elements rendered within the form context. */
        children: ReactNode;
        /** The ID of the movie context for the review. */
        movieID: ObjectId;
        /** Optional unique key to distinguish between multiple form instances on one page. */
        formKey?: string;
    };

/**
 * Orchestrates the logic for creating or updating a Movie Review.
 * @param params - Configuration and child nodes for the review form flow.
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
        formKey,
        ...onSubmitProps
    } = params;

    /** Unique HTML ID for the form element, aiding accessibility and external labels. */
    const formID = `movie-review-submit-form-${formKey ?? "key"}`;

    /** Initializes form controller with validation and optional edit data. */
    const form = useMovieReviewSubmitForm({
        movieReview: editEntity,
        presetValues: {
            ...presetValues,
            movie: movieID,
        },
    });

    /** Configures the API mutation logic, handling both Create (POST) and Update (PATCH). */
    const mutation = useSubmitUserMovieReviewMutation({
        form,
        editID: editEntity?._id,
        onSubmit: onSubmitProps,
    });

    /**
     * Final submission handler.
     * @param values - Validated form data compliant with {@link MovieReviewFormValues}.
     */
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
};

export default MovieReviewSubmitFormContainer;