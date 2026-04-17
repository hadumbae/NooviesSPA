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
import {useMutation} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {destroy} from "@/domains/persons/_feat/crud";
import {PersonCRUDQueryKeys} from "@/domains/persons/_feat/crud-hooks/PersonCRUDQueryKeys.ts";
import {PersonCRUDMutationKeys} from "@/domains/persons/_feat/crud-hooks/PersonCRUDMutationKeys.ts";

/**
 * Handles deletion of a single `Person` entity.
 */
export function useRemovePersonData(
    {onSubmitSuccess, onSubmitError, successMessage, errorMessage}: MutationResponseConfig
) {
    const invalidateQueries = useInvalidateQueryKeys();

    const deletePerson = async ({_id}: { _id: ObjectId }) => {
        await destroy({_id});
    };

    const onSuccess = () => {
        invalidateQueries(
            [
                PersonCRUDQueryKeys.paginated({}),
                PersonCRUDQueryKeys.query({}),
                PersonCRUDQueryKeys.queryPaginated({})
            ],
            {exact: false},
        );

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.();
    };

    const onError = (error: unknown) => {
        handleMutationResponseError({
            error,
            displayMessage: errorMessage ?? "Failed to delete person. Please try again.",
        });

        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: PersonCRUDMutationKeys.destroy(),
        mutationFn: deletePerson,
        onSuccess,
        onError,
    });
}
