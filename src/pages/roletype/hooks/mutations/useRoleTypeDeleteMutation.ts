/**
 * @file useRoleTypeDeleteMutation.ts
 *
 * React Query mutation hook for deleting `RoleType` entities.
 *
 * Responsibilities:
 * - Executes delete requests via `RoleTypeRepository`
 * - Normalizes API errors
 * - Displays toast notifications on success
 * - Triggers consumer success/error callbacks
 * - Invalidates Role Type–related queries after mutation
 */

import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import RoleTypeRepository from "@/pages/roletype/repositories/RoleTypeRepository.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {toast} from "react-toastify";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {useMutation} from "@tanstack/react-query";
import queryClient from "@/config/ReactQueryClient.ts";
import {RoleTypeQueryKeys} from "@/pages/roletype/query/RoleTypeQueryKeys.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";

/**
 * React Query mutation hook for deleting a single Role Type.
 *
 * @param params - Optional success/error messages and lifecycle callbacks.
 * @returns Mutation object for deleting a Role Type by ID.
 */
export default function useRoleTypeDeleteMutation(
    {onDeleteSuccess, onDeleteError, successMessage, errorMessage}: OnDeleteMutationParams
) {
    const invalidateQueries = useInvalidateQueryKeys();

    /**
     * Deletes a Role Type by its identifier.
     */
    const deleteRoleType = async ({_id}: { _id: ObjectId }) => {
        await handleMutationResponse({
            action: () => RoleTypeRepository.delete({_id}),
            errorMessage: "Failed to delete role type. Please try again.",
        });
    };

    /**
     * Handles successful deletion.
     */
    const onSuccess = () => {
        invalidateQueries(
            [
                RoleTypeQueryKeys.query(),
                RoleTypeQueryKeys.paginated(),
            ],
            {exact: false},
        );

        successMessage && toast.success(successMessage);
        onDeleteSuccess?.();
    };

    /**
     * Handles deletion errors.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "An error occurred.";
        handleMutationResponseError({error, displayMessage});
        onDeleteError?.(error);
    };

    /**
     * Ensures related queries are refreshed after mutation completion.
     */
    const onSettled = async () => {
        await queryClient.invalidateQueries({
            queryKey: ["fetch_role_types_by_query"],
            exact: false,
        });
    };

    return useMutation({
        mutationKey: ["delete_single_role_type"],
        mutationFn: deleteRoleType,
        onSuccess,
        onError,
        onSettled,
    });
}
