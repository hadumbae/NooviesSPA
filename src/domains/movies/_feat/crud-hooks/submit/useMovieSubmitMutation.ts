/**
 * @fileoverview Hook for handling movie creation and update mutations with form integration.
 */

import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import buildStandardLog from "@/common/utility/features/logger/buildStandardLog.ts";
import {Movie, MovieSchema} from "@/domains/movies/_schema/movie/MovieSchema.ts";
import {MovieFormData} from "@/domains/movies/_feat/submit-data/schema/MovieFormSchema.ts";
import {create, update} from "@/domains/movies/_feat/crud";
import {MovieCRUDMutationKeys} from "@/domains/movies/_feat/crud-hooks/keys/mutationKeys.ts";
import {MovieCRUDQueryKeys} from "@/domains/movies";

/**
 * Manages the movie submission lifecycle including validation, API calls, and cache invalidation.
 */
export function useMovieSubmitMutation(): UseMutationResult<Movie, unknown, MovieFormData> {
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
        return movie;
    };

    const onSuccess = (movie: Movie) => {
        buildStandardLog({
            level: "log",
            msg: "Submitted movie data.",
            type: "INFO",
            context: {
                isEditing: true,
                movie: movie._id,
            },
        });

        queryClient.invalidateQueries({queryKey: MovieCRUDQueryKeys.all, exact: false});
    };

    return useMutation({
        mutationKey: MovieCRUDMutationKeys.submitSingle(),
        mutationFn: submitMovieData,
        onSuccess,
    });
}
