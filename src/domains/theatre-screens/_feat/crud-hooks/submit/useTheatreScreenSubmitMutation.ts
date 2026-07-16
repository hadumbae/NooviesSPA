/**
 * @fileoverview React Query mutation hook for creating or updating Theatre Screen records.
 * Manages the submission lifecycle, validation of returned data, and cache invalidation.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";

import {create, update} from "@/domains/theatre-screens/_feat/crud";
import {TheatreScreenDetails, TheatreScreenDetailsSchema} from "@/domains/theatre-screens/_schema";
import {TheatreScreenFormData} from "@/domains/theatre-screens/_feat/submit-data";
import {TheatreAdminViewDataQueryKeys} from "@/domains/theatres/_feat/admin-view-data";
import {
    TheatreScreenCRUDMutationKeys,
    TheatreScreenCRUDQueryKeys
} from "@/domains/theatre-screens/_feat/crud-hooks/keys";

/**
 * Handles the persistence logic for Theatre Screens.
 */
export function useTheatreScreenSubmitMutation(): UseMutationResult<TheatreScreenDetails, unknown, TheatreScreenFormData> {
    const config = {populate: true, virtuals: true};
    const queryClient = useQueryClient();

    /**
     * Executes the API request and validates the resulting entity.
     */
    const submitScreenData = async ({_id, ...values}: TheatreScreenFormData) => {
        const action = _id
            ? () => update({_id, data: values, config})
            : () => create({data: values, config});

        const {result} = await action();

        const {data: parsedData, success, error} = validateData({
            data: result,
            schema: TheatreScreenDetailsSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) throw error;
        return parsedData;
    };

    /**
     * Clears the cache and notifies the user on successful persistence.
     */
    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: TheatreScreenCRUDQueryKeys.all, exact: false});
        queryClient.invalidateQueries({queryKey: TheatreAdminViewDataQueryKeys.details(), exact: false});
    };

    return useMutation({
        mutationKey: TheatreScreenCRUDMutationKeys.submit(),
        mutationFn: submitScreenData,
        onSuccess,
    });
}