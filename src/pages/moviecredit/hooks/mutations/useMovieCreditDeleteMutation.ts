import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

/**
 * Parameters for the `useMovieCreditDeleteMutation` hook.
 */
interface deleteParams {
    /** The ID of the movie credit to delete. */
    _id: ObjectId;

    /** Optional callback executed after successful deletion. */
    onSubmit?: () => void;

    /** Optional callback executed if the deletion fails. */
    onFail?: (error: Error) => void;

    /** Optional custom toast message shown on successful deletion. */
    successToast?: string;

    /** Optional custom toast message shown on deletion failure. */
    errorToast?: string;
}

/**
 * A custom mutation hook that deletes a movie credit using the provided `_id`.
 * On success, it invalidates relevant movie credit-related queries and triggers optional callbacks and toast messages.
 *
 * @param params - Configuration object containing the `_id` to delete and optional callbacks/messages.
 * @returns A TanStack `useMutation` result that manages the deletion state and actions.
 *
 * @example
 * ```ts
 * const mutation = useMovieCreditDeleteMutation({
 *   _id: "abc123",
 *   onSubmit: () => console.log("Deleted!"),
 *   errorToast: "Could not delete movie credit."
 * });
 *
 * mutation.mutate();
 * ```
 */
export default function useMovieCreditDeleteMutation(params: deleteParams) {
    const queryClient = useQueryClient();
    const {_id, onSubmit, onFail, successToast, errorToast} = params;

    const mutationKey = ["delete_single_movie_credit", {_id}];

    const deleteMovieCredit = async () => {
        const {response} = await MovieCreditRepository.delete({_id});
        if (!response.ok) throw new HttpResponseError({response});
    }

    const onSuccess = async () => {
        const queryKeys = [
            "fetch_movie_credit",
            "fetch_all_movie_credits",
            "fetch_paginated_movie_credits",
        ];

        await Promise.all(queryKeys.map(key =>
            queryClient.invalidateQueries({queryKey: [key], exact: false})));

        toast.success(successToast || "Deleted movie credit.");
        onSubmit && onSubmit();
    }

    const onError = (error: Error) => {
        toast.error(errorToast || "Failed to delete movie credit. Please try again.")
        onFail && onFail(error);
    }

    return useMutation({
        mutationKey,
        mutationFn: deleteMovieCredit,
        onSuccess,
        onError,
    });
}