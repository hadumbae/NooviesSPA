/**
 * @fileoverview Hook for handling movie creation and update mutations with form integration.
 */

import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {toast} from "react-toastify";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import buildStandardLog from "@/common/utility/features/logger/buildStandardLog.ts";
import {Movie, MovieSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {MovieFormData, MovieFormStarterValues} from "../submit-data/MovieFormSchema.ts";
import {MutationFormConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {create, update} from "@/domains/movies/_feat/crud";
import {MovieCRUDMutationKeys} from "@/domains/movies/_feat/crud-hooks/mutationKeys.ts";

/** Configuration for movie submission including form state and callback handlers. */
export type MovieSubmitParams =
    MutationResponseConfig<Movie> & MutationFormConfig<MovieFormStarterValues, MovieFormData>;

/**
 * Manages the movie submission lifecycle including validation, API calls, and cache invalidation.
 */
export function useMovieSubmitMutation(
    params: MovieSubmitParams
): UseMutationResult<Movie, unknown, MovieFormData> {
    const {form, resetForm, ...onSubmitConfig} = params;

    const queryClient = useQueryClient();

    const submitMovieData = async ({_id, ...values}: MovieFormData): Promise<Movie> => {
        const action = _id
            ? () => update({_id, data: values})
            : () => create({data: values});

        const {result} = await action();

        const {success, error, data: movie} = validateData({
            data: result,
            schema: MovieSchema,
            message: "Invalid response data. Please try again."
        });

        if (!success) throw error;

        resetForm?.resetOnSubmit && form.reset();
        onSubmitConfig.submitMessage && toast.info(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.();

        return movie;
    };

    const onSuccess = async (movie: Movie) => {
        buildStandardLog({
            level: "log",
            msg: "Submitted movie data.",
            type: "INFO",
            context: {
                isEditing: true,
                movie: movie._id,
            },
        });

        resetForm?.resetOnSuccess && form.reset();
        queryClient.invalidateQueries({queryKey: ["movies"], exact: false});

        onSubmitConfig.successMessage && toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.(movie);
    };

    const onError = (error: unknown) => {
        resetForm?.resetOnError && form.reset();
        const fallbackMessage = onSubmitConfig.errorMessage ?? "Failed to submit movie data. Please try again.";
        handleMutationFormError({error, form, displayMessage: fallbackMessage});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: MovieCRUDMutationKeys.submitSingle(),
        mutationFn: submitMovieData,
        onSuccess,
        onError,
    });
}
