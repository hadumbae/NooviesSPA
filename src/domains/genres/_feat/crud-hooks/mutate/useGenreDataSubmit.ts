/**
 * @fileoverview React Query mutation hook for creating and updating Genre entities.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {Genre, GenreSchema} from "@/domains/genres/_schema";
import {create, update} from "@/domains/genres/_feat/crud";
import {GenreFormData} from "@/domains/genres/_feat/submit-form/schema/GenreFormSchema.ts";
import {GenreCRUDMutationKeys, GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/keys";

/**
 * Manages Genre persistence including validation, cache invalidation, and form error mapping.
 */
export function useGenreDataSubmit(): UseMutationResult<Genre, unknown, GenreFormData> {
    const queryClient = useQueryClient();

    const config = {populate: true, virtuals: true};

    const submitGenre = async ({_id, ...values}: GenreFormData): Promise<Genre> => {
        const action = _id
            ? () => update({_id, data: values, config})
            : () => create({data: values, config});

        const {result} = await action();

        const {success, error, data} = validateData({
            data: result,
            schema: GenreSchema,
            message: "Invalid genre response data.",
        });

        if (!success) throw error;

        return data;
    };

    const onSuccess = async () => {
        queryClient.invalidateQueries({queryKey: GenreCRUDQueryKeys.all, exact: false});
    };

    return useMutation({
        mutationKey: GenreCRUDMutationKeys.submit(),
        mutationFn: submitGenre,
        onSuccess,
    });
}