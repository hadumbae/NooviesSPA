/**
 * @fileoverview React Query mutation hook for creating or updating Person entities.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {PersonCRUDMutationKeys, PersonCRUDQueryKeys} from "@/domains/persons/_feat/crud-hooks/keys";
import {create, update} from "@/domains/persons/_feat/crud";
import {PersonFormData} from "@/domains/persons/_feat/submit-form";
import {Person, PersonSchema} from "@/domains/persons/_schema";

/**
 * Hook to handle the creation or update of Person records and manage form state.
 */
export function useSubmitPersonData(): UseMutationResult<Person, unknown, PersonFormData> {
    const queryClient = useQueryClient();

    const submitPersonData = async ({_id, ...data}: PersonFormData) => {
        const action = _id ? () => update({_id, data}) : () => create({data});
        const {result} = await action();

        const {data: person, success, error} = validateData({
            data: result,
            schema: PersonSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success || error) throw error;
        return person;
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: PersonCRUDQueryKeys.all, exact: false})
    };

    return useMutation({
        mutationKey: PersonCRUDMutationKeys.submit(),
        mutationFn: submitPersonData,
        onSuccess,
    });
}