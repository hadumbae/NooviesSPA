/**
 * @file useSeatSubmitMutation.ts
 *
 * React Query mutation hook for creating or updating `Seat` entities.
 *
 * Integrates:
 * - **React Hook Form** for validation and error hydration
 * - **SeatRepository** for persistence
 * - **SeatFormContext** for tracking returned seats
 * - **React Query** for cache invalidation
 *
 * Handles:
 * - Create vs. update mode via `editID`
 * - Server response validation with {@link SeatDetailsSchema}
 * - Form error hydration on failure
 * - Toast notifications
 * - Invalidation of seat ID and list query caches
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {useContext} from "react";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import {SeatDetailsSchema} from "@/pages/seats/schema/seat/SeatDetails.schema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {SeatFormContext} from "@/pages/seats/context/form/SeatFormContext.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {UseFormReturn} from "react-hook-form";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {SeatQueryKeys} from "@/pages/seats/utilities/query/SeatQueryKeys.ts";

/**
 * Parameters for {@link useSeatSubmitMutation}.
 */
type SubmitProps = {
    /**
     * Optional seat ID.
     * When provided, the mutation runs in update mode.
     */
    editID?: ObjectId;

    /**
     * React Hook Form instance.
     */
    form: UseFormReturn<SeatFormValues>;

    /**
     * Submission callbacks and messaging options.
     */
    options: MutationOnSubmitParams<SeatDetails>;
};

/**
 * Submits seat form data.
 *
 * Automatically determines create vs. update mode,
 * validates server responses, hydrates form errors,
 * and synchronizes React Query caches.
 *
 * @param params - Form instance, optional edit ID, and submission options
 * @returns React Query mutation result for seat submission
 *
 * @example
 * ```ts
 * const mutation = useSeatSubmitMutation({
 *   form,
 *   editID: undefined,
 *   options: {
 *     onSubmitSuccess: (seat) => console.log(seat),
 *   },
 * });
 *
 * mutation.mutate(values);
 * ```
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
