/** @fileoverview Mutation hook for deleting movies with automated cache invalidation and feedback. */

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import MovieRepository from "@/domains/movies/_feat/crud/remove/MovieRepository.ts";

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {MutationResponseConfig} from "@/common/features/submit-data";

/**
 * Hook to delete a movie, managing the server request, local cache invalidation, and UI feedback.
 */
export default function useMovieDeleteMutation(params?: MutationResponseConfig) {
    const queryClient = useQueryClient();
    const {onSubmitSuccess, successMessage, onSubmitError, errorMessage} = params || {};

    const mutationKey = ["delete_single_movie"];

    /** Executes the movie deletion API call via the MovieRepository. */
    const mutationFn = async ({_id}: { _id: ObjectId }) => {
        await handleMutationResponse({
            action: () => MovieRepository.delete({_id}),
            errorMessage: "Failed to delete movie. Please try again.",
        });
    };

    /** Provides success feedback and executes the success callback. */
    const onSuccess = () => {
        toast.success(successMessage ?? "Movie deleted.");
        onSubmitSuccess?.();
    };

    /** Standardizes error handling with toast notifications and error callbacks. */
    const onError = (error: unknown) => {
        const fallbackMessage = errorMessage ?? "Oops. Something went wrong. Please try again.";
        handleMutationResponseError({error, displayMessage: fallbackMessage});
        onSubmitError?.(error);
    };

    /** Ensures related movie queries are invalidated to keep the UI synchronized with the server. */
    const onSettled = async () => {
        const queryKeys = [
            "fetch_movie_by_slug",
            "fetch_movies_by_query",
            "fetch_movies",
            "fetch_paginated_movies",
        ];

        await Promise.all(queryKeys.map(queryKey => queryClient.invalidateQueries({queryKey, exact: false})));
    };

    return useMutation({
        mutationKey,
        mutationFn,
        onSuccess,
        onError,
        onSettled,
    });
}