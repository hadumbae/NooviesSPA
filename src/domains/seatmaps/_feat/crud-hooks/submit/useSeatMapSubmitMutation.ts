/**
 * @fileoverview Mutation hook for creating or updating seat map configurations.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {SeatMapDetails, SeatMapDetailsSchema} from "@/domains/seatmaps/_schema/model/SeatMapDetailsSchema";
import {SeatMapCRUDMutationKeys, SeatMapCRUDQueryKeys} from "@/domains/seatmaps/_feat/crud-hooks/keys";
import {create, update} from "@/domains/seatmaps/_feat/crud";
import {SeatMapFormData} from "@/domains/seatmaps/_feat/submit-data";

/**
 * Manages the submission of seat map form data and invalidates relevant queries on success.
 */
export function useSeatMapSubmitMutation(): UseMutationResult<SeatMapDetails, unknown, SeatMapFormData> {
    const queryClient = useQueryClient();
    const config = {populate: true, virtuals: true};

    const mutationFn = async ({_id, ...values}: SeatMapFormData) => {
        const action = _id
            ? () => update({_id, data: values, config})
            : () => create({data: values, config});

        const {result} = await action();

        const {data, success, error} = validateData({
            data: result,
            schema: SeatMapDetailsSchema,
            message: "Failed to submit seat map data.",
        });

        if (!success) throw error;
        return data;
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: SeatMapCRUDQueryKeys.all, exact: true})
    };

    return useMutation({
        mutationKey: SeatMapCRUDMutationKeys.submit(),
        mutationFn,
        onSuccess,
    });
}
