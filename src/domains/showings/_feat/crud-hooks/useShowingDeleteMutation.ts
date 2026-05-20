/**
 * @fileoverview Hook for managing the deletion mutation of showing records.
 */

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {ShowingCRUDMutationKeys} from "@/domains/showings/_feat/crud-hooks/mutationKeys.ts";
import {ShowingBaseQueryKeys} from "@/domains/showings/_feat/base-query-keys";
import {destroy} from "@/domains/showings/_feat/crud";

/** Custom mutation hook to delete a showing and invalidate related cache keys. */
export function useShowingDeleteMutation(onSubmitConfig: MutationResponseConfig) {
    const queryClient = useQueryClient();

    const deleteShowing = async ({_id}: { _id: ObjectId }) => {
        onSubmitConfig.submitMessage && toast.success(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.();

        const fetchQueryFn = () => destroy({_id});
        await useFetchErrorHandler({fetchQueryFn});
    };

    const onSuccess = () => {
        onSubmitConfig.successMessage && toast.error(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.();

        queryClient.invalidateQueries({queryKey: ShowingBaseQueryKeys.views, exact: false});
        queryClient.invalidateQueries({queryKey: ShowingBaseQueryKeys.crudList, exact: false});
    };

    const onError = (error: unknown) => {
        handleMutationResponseError({error, displayMessage: onSubmitConfig.errorMessage});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ShowingCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteShowing,
        onSuccess,
        onError,
    });
}
