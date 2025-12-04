/**
 * useSeatSubmitMutation
 *
 * React Query mutation hook for creating or updating a `Seat` entity using the `SeatRepository`.
 *
 * ### Features
 * - Automatically selects **create** or **update** mode based on `isEditing`.
 * - Validates server response using {@link SeatSchema}.
 * - Integrates with React Hook Form for local validation and error hydration.
 * - Displays success toast and calls `onSubmitSuccess` callback on success.
 * - Calls `onSubmitError` and shows error messages on failure.
 * - Invalidates seat-related queries after mutation settles.
 *
 * ### Defaults
 * - Returns fully parsed and validated `Seat` data.
 */

import {UseFormReturn} from "react-hook-form";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import {toast} from "react-toastify";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MutationEditByIDParams, MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatFormContext} from "@/pages/seats/context/form/SeatFormContext.ts";

/**
 * Options for configuring the {@link useSeatSubmitMutation} hook.
 *
 * Extends:
 * - {@link MutationOnSubmitParams} — callbacks for success and error handling.
 * - {@link MutationEditByIDParams} — `_id` and `isEditing` control mutation mode.
 *
 * Additional fields:
 * - `form`: React Hook Form instance for local validation and error mapping.
 */
export type SeatSubmitMutationFormOptions = {
    /** Optional edit mode configuration: `_id` of seat and whether editing */
    editing?: MutationEditByIDParams;

    /** Optional success and error callbacks with custom messages */
    options?: MutationOnSubmitParams<Seat>;
};

/**
 * Creates a React Query mutation for submitting seat data.
 *
 * @param form - React Hook Form instance for local validation and error propagation.
 * @param param1 - Optional configuration object including editing mode and callbacks.
 * @returns A React Query `UseMutationResult` for submitting `Seat` data.
 *
 * ### Behavior
 * - Executes **create** if `isEditing` is `false` or not provided.
 * - Executes **update** if `isEditing` is `true` and `_id` is provided.
 * - Automatically parses and validates returned data using {@link SeatSchema}.
 * - Shows success toast and calls `onSubmitSuccess` if provided.
 * - Maps server or validation errors to form errors and calls `onSubmitError` if provided.
 * - Invalidates seat-related queries after mutation settles.
 *
 * @example
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
export default function useSeatSubmitMutation(
    form: UseFormReturn<SeatFormValues>,
    {editing = {}, options = {}}: SeatSubmitMutationFormOptions = {}
): UseMutationResult<Seat, unknown, SeatForm> {
    const {setReturnedSeats} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    const {_id, isEditing} = editing;
    const {successMessage, onSubmitSuccess, errorMessage, onSubmitError} = options;

    const queryClient = useQueryClient();
    const mutationKey = ["submit_seat_data"];

    /**
     * Executes the repository request (create or update) and validates the response.
     *
     * @param values - Seat form values to submit.
     * @returns Parsed and validated `Seat` object.
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
     * Success handler: displays toast, calls external success callbacks.
     *
     * @param seat - The newly created or updated seat.
     */
    const onSuccess = async (seat: Seat) => {
        setReturnedSeats((prev) => [...prev, seat]);

        const actionDisplay = isEditing ? "updated" : "created";
        toast.success(successMessage || `Seat ${actionDisplay} successfully.`);
        onSubmitSuccess?.(seat);
    };

    /**
     * Error handler: maps server errors to form, displays toast, and calls `onSubmitError`.
     *
     * @param error - The error thrown during mutation.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to submit seat data. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    /**
     * After mutation settles, invalidate relevant queries to refresh data.
     */
    const onSettled = async () => {
        const keys = ["fetch_seats_by_query", "fetch_screen_seats_by_row"];

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
