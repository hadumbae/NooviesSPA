/**
 * @fileoverview Hook for handling the creation and updating of showing records with validation and toast notifications.
 *
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";

import {create, update} from "@/domains/showings/_feat/crud";
import {ShowingCRUDMutationKeys} from "@/domains/showings/_feat/crud-hooks/keys";
import {ShowingDetails, ShowingDetailsSchema, ShowingFormData} from "@/domains/showings/_schema";

/** Hook that manages the submission lifecycle for creating or updating showings. */
export function useShowingSubmitMutation(): UseMutationResult<ShowingDetails, unknown, ShowingFormData> {
    const config = {populate: true, virtuals: true};
    const queryClient = useQueryClient();

    const submitShowings = async (params: ShowingFormData) => {
        const {_id, ...data} = params;

        const action = _id ? () => update({_id, data, config}) : () => create({data, config});
        const {result} = await action();

        const {data: parsed, success, error} = validateData({
            data: result,
            schema: ShowingDetailsSchema,
            message: "Invalid data received.",
        });

        if (!success) throw error;
        return parsed;
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: ["showings"], exact: false});
    };

    return useMutation({
        mutationKey: ShowingCRUDMutationKeys.submitSingle(),
        mutationFn: submitShowings,
        onSuccess,
    });
}
