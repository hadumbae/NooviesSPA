/**
 * @fileoverview Utility for executing async mutations with integrated success, error, and callback handling.
 */

import {UseMutateAsyncFunction} from "@tanstack/react-query";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {handleSubmitResponseError} from "@/common/_feat/error-handling";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";

type HandlerConfig<TValues = void, TReturns = void> =
    MutationResponseConfig<TReturns, TValues> & {
    mutateAsync: UseMutateAsyncFunction<TReturns, unknown, TValues, unknown>;
};

type HandlerValues<TValues = void> = (TValues extends void ? never : TValues);

/** Executes an asynchronous mutation function with lifecycle callbacks and notification handling. */
export function handleMutateAsync<TValues = void, TReturns = void>(
    {mutateAsync, ...mutateConfig}: HandlerConfig<TValues, TReturns>
) {
    return async (values: HandlerValues<TValues>) => {
        try {
            handleMutationCallback({
                message: mutateConfig.submitMessage,
                cb: () => mutateConfig.onSubmit?.(values as TValues),
            });

            const data = await mutateAsync(values as TValues);

            handleMutationCallback({
                message: mutateConfig.successMessage,
                cb: () => mutateConfig.onSubmitSuccess?.(data),
                messageType: "success",
            });

            return data;
        } catch (error: unknown) {
            handleSubmitResponseError({error, displayMessage: mutateConfig.errorMessage});
            mutateConfig.onSubmitError?.(error);
        }
    }
}