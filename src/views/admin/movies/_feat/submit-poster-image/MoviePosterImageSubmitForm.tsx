/**
 * @fileoverview Container component for managing the submission of movie poster images.
 */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/_schemas";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {handleFormSubmitError} from "@/common/_feat/error-handling/handleFormSubmitError.ts";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/common/components/ui";
import {
    Movie,
    MoviePosterImageFormData,
    MoviePosterImageFormValues,
    useMoviePosterImageSubmitForm,
    useMoviePosterImageSubmitMutation,
} from "@/domains/movies";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";

/** Props for the MoviePosterImageSubmitFormContainer component. */
export type FormProps = MutationResponseConfig<Movie, MoviePosterImageFormData> & MutationFormResetConfig & {
    children: ReactNode;
    movieID: ObjectId;
    className?: string;
};

/**
 * Orchestrates the form state and mutation logic for uploading a movie poster.
 */
export function MoviePosterImageSubmitForm(
    {children, movieID, className, ...submitConfig}: FormProps
): ReactElement {
    const formID = useGenerateFormID("movie-poster-image-submit-form");

    const form = useMoviePosterImageSubmitForm();
    const {mutateAsync, isPending, isError} = useMoviePosterImageSubmitMutation({movieID});

    const submitPosterImage = async (values: MoviePosterImageFormValues) => {
        try {
            handleMutationCallback({
                message: submitConfig.submitMessage,
                cb: () => submitConfig.onSubmit?.(values),
            });

            const movie = await mutateAsync(values);

            handleMutationCallback({
                message: submitConfig.successMessage,
                cb: () => submitConfig.onSubmitSuccess?.(movie),
                messageType: "success",
            });
        } catch (error: unknown) {
            handleFormSubmitError({form, error, displayMessage: submitConfig.errorMessage});
            submitConfig.onSubmitError?.(error);
        }
    };

    return (
        <BaseFormContextProvider
            formID={formID}
            submitHandler={submitPosterImage}
            isPending={isPending}
            isError={isError}
        >
            <Form {...form}>
                <form>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}
