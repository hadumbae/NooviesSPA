/**
 * @file useAddToUserFavourites.ts
 * Mutation hook for adding a movie to user favourites.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import * as UserFavouriteRepository from "@/pages/users/repositories/favourites/UserFavouriteRepository.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {toast} from "react-toastify";

/**
 * Optional mutation callbacks and toast messages for success/error handling.
 */
type MutationProps = Omit<MutationOnSubmitParams, "onSubmitSuccess"> & {
    onSubmitSuccess?: () => void;
}

/**
 * Adds a movie to the authenticated user's favourites.
 */
export function useAddToUserFavourites(
    {onSubmitSuccess, successMessage, onSubmitError, errorMessage}: MutationProps
): UseMutationResult<void, unknown, ObjectId> {
    const addToFavourites = async (movieID: ObjectId) => {
        await UserFavouriteRepository.patchAddToUserFavourites(movieID);
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
        mutationKey: ["profile", "favourites", "add"],
        mutationFn: addToFavourites,
        onSuccess,
        onError,
    });
}
