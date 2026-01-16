/**
 * @file usePersonDeleteMutation.ts
 *
 * React Query mutation hook for deleting `Person` entities.
 *
 * Responsibilities:
 * - Executes delete requests via `PersonRepository`
 * - Normalizes API errors
 * - Displays toast notifications
 * - Invalidates related person queries on success
 */

import {toast} from "react-toastify";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import {useMutation} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {PersonQueryKeys} from "@/pages/persons/utiliities/query/PersonQueryKeys.ts";

/**
 * Handles deletion of a single `Person` entity.
 */
export default function usePersonDeleteMutation(
    {onDeleteSuccess, onDeleteError, successMessage, errorMessage}: OnDeleteMutationParams
) {
    const invalidateQueries = useInvalidateQueryKeys();

    const deletePerson = async ({_id}: {_id: ObjectId}) => {
        await handleMutationResponse({
            action: () => PersonRepository.delete({_id}),
            errorMessage: "Failed to delete person data. Please try again.",
        });
    };

    const onSuccess = () => {
        invalidateQueries(
            [PersonQueryKeys.query(), PersonQueryKeys.paginated()],
            {exact: false},
        );

        successMessage && toast.success(successMessage);
        onDeleteSuccess?.();
    };

    const onError = (error: unknown) => {
        handleMutationResponseError({
            error,
            displayMessage: errorMessage ?? "Failed to delete person. Please try again.",
        });

        onDeleteError?.(error);
    };

    return useMutation({
        mutationKey: ['delete_single_person'],
        mutationFn: deletePerson,
        onSuccess,
        onError,
    });
}
