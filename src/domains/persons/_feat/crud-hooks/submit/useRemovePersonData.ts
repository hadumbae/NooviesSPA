/**
 * @fileoverview React Query mutation hook for deleting Person entities.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {destroy} from "@/domains/persons/_feat/crud";
import {PersonCRUDMutationKeys, PersonCRUDQueryKeys} from "@/domains/persons/_feat/crud-hooks/keys";

/** The unique identifier of the person to be deleted. */
type DeleteValue = {
    _id: ObjectId;
};

/** Handles deletion of a single Person entity. */
export function useRemovePersonData(): UseMutationResult<void, unknown, DeleteValue> {
    const queryClient = useQueryClient();

    const deletePerson = async ({_id}: DeleteValue) => {
        await destroy({_id});
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: PersonCRUDQueryKeys.list(), exact: false});
    };

    return useMutation({
        mutationKey: PersonCRUDMutationKeys.destroy(),
        mutationFn: deletePerson,
        onSuccess,
    });
}
