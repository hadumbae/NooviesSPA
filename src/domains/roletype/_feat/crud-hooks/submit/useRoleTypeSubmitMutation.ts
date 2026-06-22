/**
 * @fileoverview React Query mutation hook for creating or updating RoleType entities.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {create, update,} from "@/domains/roletype/_feat/crud";
import {RoleTypeFormData} from "@/domains/roletype/_feat/submit-data";
import {RoleType, RoleTypeSchema} from "@/domains/roletype/schema";
import {RoleTypeCRUDMutationKeys, RoleTypeCRUDQueryKeys} from "@/domains/roletype/_feat/crud-hooks/keys";

/** Hook that manages the submission lifecycle for Role Type creation and updates. */
export function useRoleTypeSubmitMutation(): UseMutationResult<RoleType, unknown, RoleTypeFormData> {
    const queryClient = useQueryClient();

    const submitRoleTypeData = async (data: RoleTypeFormData) => {
        const {_id, ...values} = data;

        const action = _id
            ? () => update({_id, data: values})
            : () => create({data: values});

        const {result} = await action();

        const {data: parsed, success, error} = validateData({
            data: result,
            schema: RoleTypeSchema,
            message: "Invalid data received. Please try again.",
        });

        if (!success) throw error;
        return parsed;
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: RoleTypeCRUDQueryKeys.all, exact: false});
    };

    return useMutation({
        mutationKey: RoleTypeCRUDMutationKeys.submitSingle(),
        mutationFn: submitRoleTypeData,
        onSuccess,
    });
}
