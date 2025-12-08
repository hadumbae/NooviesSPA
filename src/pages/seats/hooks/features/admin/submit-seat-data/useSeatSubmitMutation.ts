/**
 * @file useSeatSubmitMutation.ts
 *
 * ⚡ useSeatSubmitMutation
 *
 * React Query mutation hook for submitting `Seat` data (create or update).
 * Integrates with React Hook Form, SeatFormContext, and the SeatRepository.
 *
 * Responsibilities:
 * - Determine mutation mode (create vs. update) based on `editing.isEditing`
 * - Validate server response with {@link SeatDetailsSchema}
 * - Hydrate form errors from server or validation failures
 * - Call success/error callbacks and display toast notifications
 * - Update `SeatFormContext.returnedSeats` and invalidate seat-related queries
 *
 * Example:
 * ```ts
 * const mutation = useSeatSubmitMutation(form, {
 *   editing: { isEditing: false },
 *   options: {
 *     onSubmitSuccess: (seat) => console.log("Created:", seat),
 *   },
 * });
 *
 * mutation.mutate(formValues);
 * ```
 */

import {UseFormReturn} from "react-hook-form";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import {SeatDetailsSchema} from "@/pages/seats/schema/seat/SeatDetails.schema.ts";
import {MutationEditByIDParams, MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatFormContext} from "@/pages/seats/context/form/SeatFormContext.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";

/**
 * Options for {@link useSeatSubmitMutation}.
 */
export type SeatSubmitMutationFormOptions = {
    /** Optional edit mode: `_id` and `isEditing` */
    editing?: MutationEditByIDParams;

    /** Optional success and error callbacks */
    options?: MutationOnSubmitParams<SeatDetails>;
};

/**
 * ⚡ useSeatSubmitMutation hook
 *
 * @param form - React Hook Form instance for validation/error handling
 * @param config - Optional config: editing mode and callbacks
 * @returns React Query mutation for submitting `Seat` data
 */
export default function useSeatSubmitMutation(
    form: UseFormReturn<SeatFormValues>,
    {editing = {}, options = {}}: SeatSubmitMutationFormOptions = {}
): UseMutationResult<SeatDetails, unknown, SeatForm> {

    // ⚡ Context ⚡
    const {setReturnedSeats} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    const {_id, isEditing} = editing;
    const {successMessage, onSubmitSuccess, errorMessage, onSubmitError} = options;
    const queryClient = useQueryClient();
    const mutationKey = ["submit_seat_data"];

    // ⚡ Mutation Function ⚡
    const submitSeatData = async (values: SeatForm) => {
        const action = isEditing
            ? () => SeatRepository.update({_id, data: values, populate: true, virtuals: true})
            : () => SeatRepository.create({data: values, populate: true, virtuals: true});

        const returnData = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again."
        });

        const {success, data: parsedData, error} = validateData({
            data: returnData,
            schema: SeatDetailsSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) {
            Logger.error({
                msg: "Invalid data received on fetch request",
                context: {raw: returnData},
            });

            throw error;
        }

        return parsedData;
    };

    // ⚡ Handlers ⚡
    const onSuccess = async (seat: SeatDetails) => {
        setReturnedSeats((prev) => [...prev, seat]);
        const actionDisplay = isEditing ? "updated" : "created";
        toast.success(successMessage || `Seat ${actionDisplay} successfully.`);
        onSubmitSuccess?.(seat);
    };

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to submit seat data. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    const onSettled = async () => {
        const keys = ["fetch_seats_by_query", "fetch_screen_seats_by_row"];
        await Promise.all(
            keys.map((key) => queryClient.invalidateQueries({queryKey: [key], exact: false}))
        );
    };

    // ⚡ Return Mutation ⚡
    return useMutation({
        mutationKey,
        mutationFn: submitSeatData,
        onSuccess,
        onError,
        onSettled,
    });
}
