/**
 * @fileoverview Hook for deleting a user document from the database.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";
import {destroy} from "@/domains/genres/_feat/crud";
import {UserCRUDMutationKeys, UserCRUDQueryKeys} from "@/domains/users/_feat/crud-hooks/keys";

/** Object containing the ID of the user to be deleted. */
type DeleteByID = {
    _id: ObjectId;
};

/** Hook that provides a mutation function to delete a user and invalidates the user list on success. */
export function useDeleteUser(): UseMutationResult<void, unknown, DeleteByID> {
    const queryClient = useQueryClient();

    const deleteUser = async ({_id}: DeleteByID) => {
        await destroy({_id})
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: UserCRUDQueryKeys.list(), exact: false});
    };

    return useMutation({
        mutationKey: UserCRUDMutationKeys.destroy(),
        mutationFn: deleteUser,
        onSuccess,
    });
}