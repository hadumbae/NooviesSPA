/**
 * @fileoverview React Query mutation hook for theatre entity creation and updates.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {create, update} from "@/domains/theatres/_feat/crud";
import {TheatreFormData} from "@/domains/theatres/_feat/submit-data/schema.ts";
import {Theatre, TheatreSchema} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";
import {TheatreCRUDMutationKeys, TheatreCRUDQueryKeys} from "@/domains/theatres/_feat/crud-hooks/keys";

/**
 * Manages theatre form submissions with automatic create/update switching.
 * Handles validation, cache invalidation, and form error mapping.
 */
export function useTheatreSubmitMutation(): UseMutationResult<Theatre, unknown, TheatreFormData> {
    const queryClient = useQueryClient();

    const submitTheatreData = async ({_id, ...values}: TheatreFormData): Promise<Theatre> => {
        const action = _id ? () => update({_id, data: values}) : () => create({data: values});
        const {result} = await action();

        const {success, data, error} = validateData({data: result, schema: TheatreSchema});

        if (!success) throw error;
        return data;
    };

    const onSuccess = (): void => {
        queryClient.invalidateQueries({queryKey: TheatreCRUDQueryKeys.all, exact: false});
    };

    return useMutation({
        mutationKey: TheatreCRUDMutationKeys.submit(),
        mutationFn: submitTheatreData,
        onSuccess,
    });
}