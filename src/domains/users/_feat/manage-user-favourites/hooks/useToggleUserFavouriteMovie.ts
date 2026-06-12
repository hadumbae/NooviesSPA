/**
 * @file Mutation hook for toggling a user's favourite movie.
 * useToggleUserFavouriteMovie.ts
 */

import {toast} from "react-toastify";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {patchToggleUserFavouriteMovie} from "@/domains/users/_feat/manage-user-favourites/repository";
import {ManageUserFavouritesMutationKeys} from "@/domains/users/_feat/manage-user-favourites/hooks";
import {MutationResponseConfig} from "@/common/_feat/submit-data";

/** Performs a favourite toggle mutation for the current user. */
export function useToggleUserFavouriteMovie(
    onSubmitConfig: MutationResponseConfig<void, ObjectId> = {}
): UseMutationResult<ObjectId, unknown, ObjectId> {
    const queryClient = useQueryClient();

    const toggleFavouriteMovie = async (movieID: ObjectId) => {
        onSubmitConfig.submitMessage && toast.info(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.(movieID);

        await patchToggleUserFavouriteMovie(movieID);
        return movieID;
    }

    const onSuccess = async (movieID: ObjectId) => {
        await queryClient.invalidateQueries({
            queryKey: ["profile", "favourites", "check", "movie", {_id: movieID}]
        });

        onSubmitConfig.successMessage && toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.();
    }

    const onError = (error: unknown) => {
        toast.error(onSubmitConfig.errorMessage ?? "Something bad happened. Please try again.");
        onSubmitConfig.onSubmitError?.(error);
    }

    return useMutation({
        mutationKey: ManageUserFavouritesMutationKeys.toggleMovie(),
        mutationFn: toggleFavouriteMovie,
        onSuccess,
        onError,
    });
}