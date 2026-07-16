/**
 * @fileoverview Mutation hook for deleting movie credits with cache invalidation and notifications.
 */

import {ObjectId} from "@/common/_schemas";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {destroy} from "@/domains/movie-credits/_feat/crud";
import {MovieCreditCRUDMutationKeys} from "@/domains/movie-credits/_feat/crud-hooks/mutationKeys.ts";
import {MovieCreditCRUDQueryKeys} from "@/domains/movie-credits/_feat/crud-hooks/queryKeys.ts";


/** The payload required to identify the movie credit for deletion. */
type DeleteValue = {
    _id: ObjectId;
}

/** Hook to delete a movie credit and invalidate the credit list cache. */
export function useMovieCreditDeleteMutation(): UseMutationResult<void, unknown, DeleteValue> {
    const queryClient = useQueryClient();

    const deleteMovieCredit = async ({_id}: DeleteValue) => {
        await destroy({_id});
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: MovieCreditCRUDQueryKeys.list, exact: false});
    };

    return useMutation({
        mutationKey: MovieCreditCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteMovieCredit,
        onSuccess,
    });
}