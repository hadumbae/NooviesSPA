/**
 * @fileoverview React Query mutation hook for theatre entity creation and updates.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {UseFormReturn} from "react-hook-form";
import {toast} from "react-toastify";

import {MutationFormResetConfig, MutationResponseConfig} from "@/common/features/submit-data";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {create, update} from "@/domains/theatres/_feat/crud";
import {TheatreFormStarterValues} from "@/domains/theatres/_feat/submit-data";
import {TheatreFormData} from "@/domains/theatres/_feat/submit-data/TheatreForm.schema.ts";
import {Theatre, TheatreSchema} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";
import {TheatreQueryKeys} from "@/domains/theatres/utilities/query/TheatreQueryKeys.ts";

/** Props for the useTheatreSubmitMutation hook. */
export type TheatreSubmitMutationParams = MutationFormResetConfig & MutationResponseConfig<Theatre> & {
    form: UseFormReturn<TheatreFormStarterValues, unknown, TheatreFormData>;
};

/**
 * Manages theatre form submissions with automatic create/update switching.
 * Handles validation, cache invalidation, and form error mapping.
 */
export function useTheatreSubmitMutation(
    params: TheatreSubmitMutationParams,
): UseMutationResult<Theatre, unknown, TheatreFormData> {
    const {
        form,
        successMessage,
        onSubmitSuccess,
        errorMessage,
        onSubmitError,
        resetOnSubmit,
        resetOnSuccess,
        resetOnError,
    } = params;

    const invalidateQueries = useInvalidateQueryKeys();

    const submitTheatreData = async ({_id, ...values}: TheatreFormData): Promise<Theatre> => {
        const action = _id
            ? () => update({_id, data: values})
            : () => create({data: values});

        const {result} = await action();
        const {success, data, error} = validateData({
            data: result,
            schema: TheatreSchema,
        });

        if (!success) throw error;
        resetOnSubmit && form.reset();
        return data;
    };

    const onSuccess = (theatre: Theatre): void => {
        invalidateQueries(
            [
                TheatreQueryKeys.ids({_id: theatre._id}),
                TheatreQueryKeys.slugs({slug: theatre.slug}),
                TheatreQueryKeys.paginated(),
                TheatreQueryKeys.query(),
            ],
            {exact: false},
        );

        successMessage && toast.success(successMessage);
        resetOnSuccess && form.reset();
        onSubmitSuccess?.(theatre);
    };

    const onError = (error: unknown): void => {
        toast.error(errorMessage || "Oops. Something went wrong.");
        handleMutationFormError({form, error});

        resetOnError && form.reset();
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_theatre_data"],
        mutationFn: submitTheatreData,
        onSuccess,
        onError,
    });
}