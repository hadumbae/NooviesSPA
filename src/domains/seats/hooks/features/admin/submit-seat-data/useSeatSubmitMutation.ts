/**
 * @fileoverview Mutation hook for creating or updating theatre seat entities with form synchronization.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {useContext} from "react";
import SeatRepository from "@/domains/seats/repositories/SeatRepository.ts";
import {SeatDetails} from "@/domains/seats/schema/seat/SeatDetails.types.ts";
import {SeatDetailsSchema} from "@/domains/seats/schema/seat/SeatDetails.schema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {SeatFormContext} from "@/domains/seats/context/form/SeatFormContext.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {UseFormReturn} from "react-hook-form";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {SeatQueryKeys} from "@/domains/seats/utilities/query/SeatQueryKeys.ts";
import {SeatForm, SeatFormValues} from "@/domains/seats/_feat/submit-data";

/** Props for the useSeatSubmitMutation hook. */
type SubmitProps = {
    editID?: ObjectId;
    form: UseFormReturn<SeatFormValues, unknown, SeatForm>;
    options: MutationOnSubmitParams<SeatDetails>;
};

/**
 * Handles seat persistence, server response validation, and React Query cache invalidation.
 */
export default function useSeatSubmitMutation(
    params: SubmitProps
): UseMutationResult<SeatDetails, unknown, SeatForm> {
    const {form, editID, options} = params;
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = options;

    const invalidateQueries = useInvalidateQueryKeys();

    const {setReturnedSeats} = useContext(SeatFormContext) ?? {};

    const submitSeatData = async (values: SeatForm) => {
        const config = {populate: true, virtuals: true};

        const action = editID
            ? () => SeatRepository.update({_id: editID, data: values, config})
            : () => SeatRepository.create({data: values, config});

        const returnData = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again.",
        });

        const {success, data, error} = validateData({
            data: returnData,
            schema: SeatDetailsSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) {
            Logger.error({
                msg: "Invalid seat data returned from mutation",
                context: {raw: returnData},
            });
            throw error;
        }

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

        setReturnedSeats?.((prev) => [...prev, seat]);
        successMessage && toast.success(successMessage);
        onSubmitSuccess?.(seat);
    };

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to submit seat data. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_seat_data"],
        mutationFn: submitSeatData,
        onSuccess,
        onError,
    });
}