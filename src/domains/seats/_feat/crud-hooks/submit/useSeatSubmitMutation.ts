/**
 * @fileoverview Mutation hook for creating or updating theatre seat entities with form synchronization.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";

import {create, update} from "@/domains/seats/_feat/crud";
import {SeatDetails, SeatDetailsSchema} from "@/domains/seats/_schema";
import {SeatFormData} from "@/domains/seats/_feat/submit-data";
import {SeatCRUDMutationKeys, SeatCRUDQueryKeys} from "@/domains/seats/_feat/crud-hooks/keys";
import {TheatreScreenAdminViewDataQueryKeys} from "@/domains/theatre-screens/_feat/admin-view-data/keys";

/** Handles seat persistence, server response validation, and React Query cache invalidation. */
export function useSeatSubmitMutation(): UseMutationResult<SeatDetails, unknown, SeatFormData> {
    const queryClient = useQueryClient();
    const config = {populate: true, virtuals: true};

    const submitSeatData = async ({_id, ...values}: SeatFormData) => {
        const action = _id
            ? () => update({_id, data: values, config})
            : () => create({data: values, config});

        const {result} = await action();

        const {success, data, error} = validateData({
            data: result,
            schema: SeatDetailsSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) throw error;
        return data;
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: SeatCRUDQueryKeys.all, exact: false})
        queryClient.invalidateQueries({queryKey: TheatreScreenAdminViewDataQueryKeys.details(), exact: false})
    };

    return useMutation({
        mutationKey: SeatCRUDMutationKeys.submit(),
        mutationFn: submitSeatData,
        onSuccess,
    });
}