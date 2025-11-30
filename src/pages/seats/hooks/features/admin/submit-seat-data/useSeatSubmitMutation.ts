/**
 * useSeatSubmitMutation
 *
 * A React Query mutation hook to create or update a `Seat` entity using the `SeatRepository`.
 *
 * ### Features
 * - Automatically selects **create** or **update** mode based on `isEditing`.
 * - Validates server response using {@link SeatSchema}.
 * - Handles form errors and integrates with React Hook Form.
 * - Shows success toast and calls `onSubmitSuccess` callback.
 * - Calls `onSubmitError` on failure and displays error messages.
 * - Invalidates seat-related queries after mutation.
 *
 * ### Defaults
 * - Returns enriched `Seat` data.
 */

import {UseFormReturn} from "react-hook-form";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {SeatForm, SeatFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import {toast} from "react-toastify";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MutationEditByIDParams, MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters for {@link useSeatSubmitMutation}.
 *
 * Extends:
 * - {@link MutationOnSubmitParams}: for submit-success/error callbacks
 * - {@link MutationEditByIDParams}: `_id` and `isEditing` controls
 *
 * Additional fields:
 * - `form`: React Hook Form instance for local validation and error propagation
 */
export type SeatSubmitMutationFormParams =
    MutationOnSubmitParams<Seat> &
    MutationEditByIDParams & {
    /**
     * React Hook Form instance for local validation and error handling.
     */
    form: UseFormReturn<SeatFormValues>;
};

/**
 * `useSeatSubmitMutation`
 *
 * Creates a React Query mutation for submitting seat data.
 *
 * ### Behavior
 * - **Create mode**: executed when `isEditing` is `false`.
 * - **Update mode**: executed when `isEditing` is `true` and `_id` is provided.
 * - Returns parsed and validated data of type {@link Seat}.
 * - Automatically handles:
 *   - Success toasts and callbacks (`onSubmitSuccess`)
 *   - Form error hydration (`onSubmitError`)
 *   - Invalidating seat-related queries after submission
 *
 * @param params - All mutation configuration fields, form reference, and callbacks.
 * @returns A React Query `UseMutationResult` for submitting seat data.
 *
 * @example
 * ```ts
 * const mutation = useSeatSubmitMutation({
 *   form,
 *   isEditing: false,
 *   onSubmitSuccess: (seat) => console.log("Created:", seat),
 * });
 *
 * mutation.mutate(formValues);
 * ```
 */
export default function useSeatSubmitMutation(
    params: SeatSubmitMutationFormParams
): UseMutationResult<Seat, unknown, SeatForm> {
    const {
        form,
        _id,
        isEditing,
        successMessage,
        onSubmitSuccess,
        errorMessage,
        onSubmitError,
    } = params;

    const queryClient = useQueryClient();
    const mutationKey = ["submit_seat_data"];

    /**
     * Executes repository create/update request and validates response.
     */
    const submitSeatData = async (values: SeatForm) => {
        const action = isEditing
            ? () => SeatRepository.update({_id, data: values})
            : () => SeatRepository.create({data: values});

        const returnData = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again.",
        });

        const {success, data: parsedData, error} = validateData({
            data: returnData,
            schema: SeatSchema,
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

    /**
     * Success handler: displays toast, calls external callbacks, etc.
     */
    const onSuccess = async (seat: Seat) => {
        const actionDisplay = isEditing ? "updated" : "created";
        toast.success(successMessage || `Seat ${actionDisplay} successfully.`);
        onSubmitSuccess?.(seat);
    };

    /**
     * Error handler: maps server errors to form errors, displays toast, etc.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to submit seat data. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    /**
     * After mutation settles (success or error), invalidate all relevant queries.
     */
    const onSettled = async () => {
        const keys = [
            "fetch_seats_by_query",
            "fetch_screen_seats_by_row",
        ];

        await Promise.all(
            keys.map((key) =>
                queryClient.invalidateQueries({queryKey: [key], exact: false})
            )
        );
    };

    return useMutation({
        mutationKey,
        mutationFn: submitSeatData,
        onSuccess,
        onError,
        onSettled,
    });
}
