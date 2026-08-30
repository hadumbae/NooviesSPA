/**
 * @file Mutation hook for toggling a user's favourite movie.
 * useToggleUserFavouriteMovie.ts
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";
import {patchToggleUserFavouriteMovie} from "@/domains/users/_feat/manage-user-favourites/repository";
import {MovieClientViewDataQueryKeys} from "@/domains/movies";
import {
    ManageUserFavouritesMutationKeys,
    ManageUserFavouritesQueryKeys
} from "@/domains/users/_feat/manage-user-favourites/hooks";

/** Performs a favourite toggle mutation for the current user. */
export function useToggleUserFavouriteMovie(): UseMutationResult<ObjectId, unknown, ObjectId> {
    const queryClient = useQueryClient();

    const toggleFavouriteMovie = async (movieID: ObjectId) => {
        await patchToggleUserFavouriteMovie(movieID);
        return movieID;
    }

    const onSuccess = async () => {
        await queryClient.invalidateQueries({queryKey: ManageUserFavouritesQueryKeys.fetchCurrent(), exact: false});
        await queryClient.invalidateQueries({queryKey: MovieClientViewDataQueryKeys.all, exact: false,});
        await queryClient.invalidateQueries({queryKey: ManageUserFavouritesQueryKeys.all, exact: false,});
    }

    return useMutation({
        mutationKey: ManageUserFavouritesMutationKeys.toggleMovie(),
        mutationFn: toggleFavouriteMovie,
        onSuccess,
    });
}