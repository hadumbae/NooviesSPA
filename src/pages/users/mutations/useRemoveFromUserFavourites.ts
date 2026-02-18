/**
 * @file useRemoveFromUserFavourites.ts
 * Mutation hook for removing a movie from user favourites.
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import * as UserFavouriteRepository from "@/pages/users/repositories/favourites/UserFavouriteRepository.ts";
import {toast} from "react-toastify";
import {useMutation, UseMutationResult} from "@tanstack/react-query";

/**
 * Optional mutation callbacks and toast messages for success/error handling.
 */
type MutationProps = Omit<MutationOnSubmitParams, "onSubmitSuccess"> & {
    onSubmitSuccess?: () => void;
}

/**
 * Removes a movie from the authenticated user's favourites.
 */
export function useRemoveFromUserFavourites(
    {onSubmitSuccess, successMessage, onSubmitError, errorMessage}: MutationProps
): UseMutationResult<void, unknown, ObjectId> {
    const addToFavourites = async (movieID: ObjectId) => {
        await UserFavouriteRepository.patchRemoveFromUserFavourites(movieID);
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
        mutationKey: ["profile", "favourites", "remove"],
        mutationFn: addToFavourites,
        onSuccess,
        onError,
    });
}
