/**
 * @fileoverview React Query mutation hook for creating and updating Genres.
 * Handles validation, submission logic, and wide-scale cache invalidation.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {Genre, GenreSchema} from "@/domains/genres/schema/genre/GenreSchema.ts";
import {MutationFormConfig, MutationResponseConfig} from "@/common/features/submit-data";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDQueryKeys.ts";
import {create, update} from "@/domains/genres/_feat/crud";
import {GenreFormData} from "@/domains/genres/_feat/submit-form/GenreFormSchema.ts";

/**
 * Combined configuration for genre mutations.
 */
export type UseGenreDataSubmitConfig = MutationResponseConfig<Genre> & MutationFormConfig<GenreFormData>;

/**
 * Manages Genre persistence lifecycle with automated cache cleanup and form error mapping.
 */
export default function useGenreDataSubmit(
    params: UseGenreDataSubmitConfig
): UseMutationResult<Genre, unknown, GenreFormData> {
    const {form, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;
    const invalidateQueries = useInvalidateQueryKeys();

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

    const onSuccess = async (genre: Genre) => {
        await invalidateQueries(
            [
                GenreCRUDQueryKeys._id({}),
                GenreCRUDQueryKeys.slug({}),
                GenreCRUDQueryKeys.query({}),
                GenreCRUDQueryKeys.paginated({}),
                GenreCRUDQueryKeys.queryPaginated({}),
            ],
            {exact: false},
        );

        if (successMessage) toast.success(successMessage);
        onSubmitSuccess?.(genre);
    };

    const onError = (error: unknown) => {
        if (form) handleMutationFormError({form, error, displayMessage: errorMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_genre"],
        mutationFn: submitGenre,
        onSuccess,
        onError,
    });
}