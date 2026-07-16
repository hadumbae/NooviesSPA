/**
 * @fileoverview Container component for handling movie submission logic and form state.
 */

import {ReactElement, ReactNode} from 'react';
import {MovieFormData, MovieFormStarterValues, useMovieSubmitForm} from "@/domains/movies/_feat/submit-data";
import {useMovieSubmitMutation} from "@/domains/movies/_feat/crud-hooks";
import {FormValuesConfig, MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {Movie} from "@/domains/movies/_schema/movie";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import {Logger} from "@/common/_feat/logger/Logger.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";

type ContainerProps =
    MutationResponseConfig<Movie, MovieFormData>
    & MutationFormResetConfig
    & FormValuesConfig<MovieFormStarterValues, Movie>
    & { children: ReactNode };

/**
 * Orchestrates movie data submission by providing form context and handling mutation triggers.
 */
export function MovieSubmitForm(
    {children, presetValues, editEntity, ...submitConfig}: ContainerProps
): ReactElement {

    const formID = useGenerateFormID("form-submit-movie-data");

    const form = useMovieSubmitForm({movie: editEntity, presetValues});
    const {mutateAsync, isPending, isError} = useMovieSubmitMutation();

    const submitMovieData = async (values: MovieFormData) => {
        try {
            handleMutationCallback({
                message: submitConfig.submitMessage,
                cb: () => submitConfig.onSubmit?.(values),
            });

            const movie = await mutateAsync(values);

            Logger.log({
                msg: "Movie Created/Updated.",
                type: "INFO",
                context: {movie: movie._id},
            });

            handleMutationCallback({
                message: submitConfig.successMessage,
                cb: () => submitConfig.onSubmitSuccess?.(movie),
                messageType: "success",
            });
        } catch (error: unknown) {
            handleMutationFormError({form, error, displayMessage: submitConfig.errorMessage});
            submitConfig.onSubmitError?.(error);
        }
    };

    return (
        <BaseFormContextProvider
            formID={formID}
            isPending={isPending}
            isError={isError}
            submitHandler={submitMovieData}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(submitMovieData)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}
