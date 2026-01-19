import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {MovieCreditQueryKeys} from "@/pages/moviecredit/utility/query/MovieCreditQueryKeys.ts";

/**
 * Delete a movie credit.
 *
 * Handles toasts, callbacks,
 * and cache invalidation.
 */
export default function useMovieCreditDeleteMutation(
    {onDeleteSuccess, onDeleteError, successMessage, errorMessage}: OnDeleteMutationParams = {}
) {
    const invalidateQueries = useInvalidateQueryKeys();

    const mutationKey = ["delete_single_movie_credit"];

    const deleteMovieCredit = async ({_id}: { _id: ObjectId }) => {
        await handleMutationResponse({
            action: () => MovieCreditRepository.delete({_id}),
            errorMessage: "Failed to delete movie credit. Please try again.",
        });
    };

    const onSuccess = () => {
        invalidateQueries(
            [
                MovieCreditQueryKeys.persons(),
                MovieCreditQueryKeys.query(),
                MovieCreditQueryKeys.paginated(),
            ],
            {exact: false},
        )

        toast.success(successMessage ?? "Deleted movie credit.");
        onDeleteSuccess?.();
    };

    const onError = (error: Error) => {
        const fallbackMessage =
            errorMessage ?? "Failed to delete movie credit. Please try again.";

        handleMutationResponseError({error, displayMessage: fallbackMessage});
        onDeleteError?.(error);
    };

    return useMutation({
        mutationKey,
        mutationFn: deleteMovieCredit,
        onSuccess,
        onError,
    });
}
