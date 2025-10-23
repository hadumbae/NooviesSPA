import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import RoleTypeRepository from "@/pages/roletype/repositories/RoleTypeRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {toast} from "react-toastify";
import handleMutationResponseError from "@/common/utility/mutations/handleMutationResponseError.ts";
import {useMutation} from "@tanstack/react-query";
import queryClient from "@/config/ReactQueryClient.ts";

/**
 * Mutation hook for deleting a Role Type.
 *
 * - Calls {@link RoleTypeRepository.delete} to remove a record by ID.
 * - Wraps the API call with {@link handleMutationResponse} for error normalization.
 * - Displays a toast notification on success (or custom `successMessage`).
 * - Triggers `onDeleteSuccess` or `onDeleteError` callbacks if provided.
 * - Maps errors with {@link handleMutationResponseError}.
 * - Invalidates Role Type list queries on settle to refresh cached data.
 *
 * @param params - Parameters controlling success/error messages and callbacks.
 * @returns A React Query mutation for deleting a Role Type.
 *
 * @throws {HttpResponseError} For failed API requests other than validation errors.
 */
export default function useRoleTypeDeleteMutation(params: OnDeleteMutationParams) {
    const {onDeleteSuccess, onDeleteError, successMessage, errorMessage} = params;

    const deleteRoleType = async ({_id}: { _id: ObjectId }) => {
        await handleMutationResponse({
            action: () => RoleTypeRepository.delete({_id}),
            errorMessage: "Failed to delete role type. Please try again.",
        });
    };

    const onSuccess = () => {
        toast.success(successMessage ?? "Role Type deleted.");
        onDeleteSuccess?.();
    };

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "";
        handleMutationResponseError({error, displayMessage});
        onDeleteError?.(error);
    };

    const onSettled = async () => {
        await queryClient.invalidateQueries({queryKey: ["fetch_role_types_by_query"], exact: false});
    }

    return useMutation({
        mutationKey: ["delete_single_role_type"],
        mutationFn: deleteRoleType,
        onSuccess,
        onError,
        onSettled,
    })
}