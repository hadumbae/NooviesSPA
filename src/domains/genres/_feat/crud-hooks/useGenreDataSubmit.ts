/**
 * @fileoverview React Query mutation hook for creating and updating Genre entities.
 */
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {Genre, GenreSchema} from "@/domains/genres/schema/genre/GenreSchema.ts";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDQueryKeys.ts";
import {create, update} from "@/domains/genres/_feat/crud";
import {GenreFormData} from "@/domains/genres/_feat/submit-form/GenreFormSchema.ts";
import {GenreCRUDMutationKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDMutationKeys.ts";
import {UseFormReturn} from "react-hook-form";

/** Configuration for genre mutation lifecycle and form integration. */
type UseGenreDataSubmitConfig = MutationResponseConfig<Genre, GenreFormData> & MutationFormResetConfig & {
    form: UseFormReturn<GenreFormData, unknown, GenreFormData>;
};

/**
 * Manages Genre persistence including validation, cache invalidation, and form error mapping.
 */
export function useGenreDataSubmit(
    {form, resetOnSubmit, resetOnSuccess, resetOnError, ...onSubmitConfig}: UseGenreDataSubmitConfig
): UseMutationResult<Genre, unknown, GenreFormData> {
    const queryClient = useQueryClient();

    const config = {populate: true, virtuals: true};

    const submitGenre = async ({_id, ...values}: GenreFormData): Promise<Genre> => {
        if (onSubmitConfig.submitMessage) toast.success(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.({_id, ...values});

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
        if (resetOnSubmit) form.reset();

        return data;
    };

    const onSuccess = async (genre: Genre) => {
        queryClient.invalidateQueries({queryKey: GenreCRUDQueryKeys.all, exact: false});

        if (resetOnSuccess) form.reset();
        if (onSubmitConfig.successMessage) toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.(genre);
    };

    const onError = (error: unknown) => {
        if (resetOnError) form.reset();
        if (form) handleMutationFormError({form, error, displayMessage: onSubmitConfig.errorMessage});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: GenreCRUDMutationKeys.submit(),
        mutationFn: submitGenre,
        onSuccess,
        onError,
    });
}