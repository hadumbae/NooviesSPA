/**
 * @fileoverview Hook for deleting a single seat entity with automatic cache invalidation and notifications.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {SeatQueryKeys} from "@/domains/seats/utilities/query/SeatQueryKeys.ts";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {destroy} from "@/domains/seats/_feat/crud";
import {SeatCRUDMutationKeys} from "@/domains/seats/_feat/crud-hooks/mutationKeys.ts";

/**
 * Executes a seat deletion mutation and synchronizes the local cache by invalidating seat lists.
 */
export default function useSeatDeleteMutation(
    params: MutationResponseConfig = {}
): UseMutationResult<void, unknown, { _id: ObjectId }> {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    const invalidateQueries = useInvalidateQueryKeys();

    const deleteSeat = async ({_id}: { _id: ObjectId }) => {
        await destroy({_id})
    };

    const onSuccess = () => {
        invalidateQueries(
            [SeatQueryKeys.query(), SeatQueryKeys.paginated()],
            {exact: false},
        );

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.();
    };

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to delete seat. Please try again.";
        handleMutationResponseError({error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: SeatCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteSeat,
        onSuccess,
        onError,
    });
}