/**
 * @fileoverview Mutation hook for creating or updating theatre seat entities with form synchronization.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {SeatDetails} from "@/domains/seats/schema/seat/SeatDetails.types.ts";
import {SeatDetailsSchema} from "@/domains/seats/schema/seat/SeatDetails.schema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {UseFormReturn} from "react-hook-form";
import {SeatQueryKeys} from "@/domains/seats/utilities/query/SeatQueryKeys.ts";
import {SeatFormData, SeatFormValues} from "@/domains/seats/_feat/submit-data";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {create, update} from "@/domains/seats/_feat/crud";
import {SeatCRUDMutationKeys} from "@/domains/seats/_feat/crud-hooks/mutationKeys.ts";

/** Props for the useSeatSubmitMutation hook. */
type SubmitProps = MutationResponseConfig<SeatDetails> & {
    form: UseFormReturn<SeatFormValues, unknown, SeatFormData>;
};

/** Handles seat persistence, server response validation, and React Query cache invalidation. */
export function useSeatSubmitMutation(
    params: SubmitProps
): UseMutationResult<SeatDetails, unknown, SeatFormData> {
    const {form, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;
    const invalidateQueries = useInvalidateQueryKeys();
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

    const onSuccess = (seat: SeatDetails) => {
        invalidateQueries(
            [
                SeatQueryKeys.ids({_id: seat._id}),
                SeatQueryKeys.slugs({slug: seat.slug}),
                SeatQueryKeys.query(),
                SeatQueryKeys.paginated(),
            ],
            {exact: false}
        );

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.(seat);
    };

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to submit seat data. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: SeatCRUDMutationKeys.submit(),
        mutationFn: submitSeatData,
        onSuccess,
        onError,
    });
}