/**
 * @fileoverview Mutation hook for deleting movies with automated cache invalidation and feedback.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {destroy} from "@/domains/movies/_feat/crud";
import {MovieClientViewDataQueryKeys} from "@/domains/movies/_feat/client-view-data/hooks";
import {MovieCRUDMutationKeys, MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks/keys";
import buildStandardLog from "@/common/utility/features/logger/buildStandardLog.ts";

/** Configuration for the movie deletion mutation. */
type DeleteIDConfig = {
    _id: ObjectId,
};

export function useMovieDeleteMutation(): UseMutationResult<DeleteIDConfig, unknown, DeleteIDConfig> {
    const queryClient = useQueryClient();

    /** Executes the movie deletion API call via the MovieRepository. */
    const mutationFn = async ({_id}: DeleteIDConfig) => {
        await destroy({_id});
        return {_id};
    };

    /** Provides success feedback and executes the success callback. */
    const onSuccess = ({_id}: DeleteIDConfig) => {
        buildStandardLog({
            level: "log",
            msg: "Movie removed.",
            type: "INFO",
            context: {
                isEditing: true,
                movie: _id,
            },
        });

        queryClient.invalidateQueries({queryKey: MovieCRUDQueryKeys.list(), exact: false});
        queryClient.invalidateQueries({queryKey: MovieClientViewDataQueryKeys.all, exact: false});
    };

    return useMutation({
        mutationKey: MovieCRUDMutationKeys.deleteSingle(),
        mutationFn,
        onSuccess,
    });
}