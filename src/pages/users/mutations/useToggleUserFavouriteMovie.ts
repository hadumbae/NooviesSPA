/**
 * @file Mutation hook for toggling a user's favourite movie.
 * useToggleUserFavouriteMovie.ts
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import * as UserFavouriteRepository from "@/pages/users/repositories/favourites/UserFavouriteRepository.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {toast} from "react-toastify";

/** Options for favourite toggle mutation lifecycle. */
type MutationProps = Omit<MutationOnSubmitParams, "onSubmitSuccess"> & {
    onSubmitSuccess?: () => void;
}

/** Performs a favourite toggle mutation for the current user. */
export function useToggleUserFavouriteMovie(
    {onSubmitSuccess, successMessage, onSubmitError, errorMessage}: MutationProps
): UseMutationResult<void, unknown, ObjectId> {
    const toggleFavouriteMovie = async (movieID: ObjectId) => {
        await UserFavouriteRepository.patchToggleUserFavouriteMovie(movieID);
    }

    const onSuccess = () => {
        successMessage && toast.success(successMessage);
        onSubmitSuccess?.();
    }

    const onError = (error: unknown) => {
        errorMessage && toast.error(errorMessage);
        onSubmitError?.(error);
    }

    return useMutation({
        mutationKey: ["profile", "favourites", "toggle"],
        mutationFn: toggleFavouriteMovie,
        onSuccess,
        onError,
    });
}