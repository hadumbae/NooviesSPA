/**
 * @fileoverview Hook for managing the deletion of seat records through asynchronous mutations and lifecycle callbacks.
 */

import {useSeatDeleteMutation} from "@/domains/seats";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

type HandlerConfig = MutationResponseConfig<void, { _id: ObjectId }> & {
    _id: ObjectId;
};

type HandlerReturns = {
    deleteSeat: () => Promise<void>;
    isPending?: boolean;
    isError?: boolean;
}

/**
 * Handles the seat deletion process by executing the mutation and triggering configured lifecycle callbacks.
 */
export function useDeleteSeatSubmitHandler(
    {_id, ...submitConfig}: HandlerConfig
): HandlerReturns {
    const {mutateAsync, isPending, isError} = useSeatDeleteMutation();

    const deleteSeat = async () => {
        try {
            handleMutationCallback({
                message: submitConfig.submitMessage,
                cb: () => submitConfig.onSubmit?.({_id}),
            });

            await mutateAsync({_id: _id});

            handleMutationCallback({
                message: submitConfig.successMessage,
                cb: () => submitConfig.onSubmitSuccess?.(),
                messageType: "success",
            });
        } catch (error: unknown) {
            handleMutationResponseError({error, displayMessage: submitConfig.errorMessage});
            submitConfig.onSubmitError?.(error);
        }
    }

    return {
        deleteSeat,
        isPending,
        isError,
    };
}