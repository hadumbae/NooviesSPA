import {UseFormReturn} from "react-hook-form";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {SeatForm, SeatFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {
    FormMutationEditingParams,
    FormMutationOnSubmitParams,
} from "@/common/type/form/FormMutationResultParams.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import {toast} from "react-toastify";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import logger from "@/common/utility/logger/logger.ts";
import handleMutationFormError from "@/common/utility/mutations/handleMutationFormError.ts";

/**
 * Parameters for the `useSeatSubmitMutation` hook.
 *
 * Combines:
 * - Form handling (`react-hook-form`)
 * - Editing state (create/update)
 * - Optional success/error messages
 * - Callbacks for mutation results
 *
 * @template TData - Type of data returned by the mutation (Seat in this case).
 * @template TSchema - Optional Zod schema type for validation (not required here).
 */
export type SeatSubmitMutationFormParams =
    Omit<FormMutationOnSubmitParams<Seat>, "validationSchema"> &
    FormMutationEditingParams & {
    /** React Hook Form instance for managing form state and validation. */
    form: UseFormReturn<SeatFormValues>;
};

/**
 * A custom hook to handle seat form submissions with React Query.
 *
 * Features:
 * - Supports both creating and updating seats depending on `isEditing`.
 * - Validates the returned data against `SeatSchema`.
 * - Displays toast notifications for success.
 * - Handles form errors via `handleMutationFormError`.
 * - Invalidates relevant queries after mutation.
 *
 * @param params - Configuration object for mutation, including form, editing state, messages, and callbacks.
 * @returns A `UseMutationResult<Seat, unknown, SeatForm>` from React Query.
 *
 * @example
 * ```ts
 * const form = useForm<SeatFormValues>();
 * const seatMutation = useSeatSubmitMutation({
 *   form,
 *   isEditing: false,
 *   successMessage: "Seat created!",
 *   errorMessage: "Could not create seat.",
 *   onSubmitSuccess: (seat) => console.log("Created seat:", seat),
 *   onSubmitError: (error) => console.error(error),
 * });
 *
 * // To submit the form:
 * seatMutation.mutate(form.getValues());
 * ```
 *
 * @remarks
 * Uses the generic `FormMutationOnSubmitParams` and `FormMutationEditingParams` types to ensure type safety
 * for success/error callbacks and editing mode parameters.
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
     * Submits seat data to the server.
     * Automatically chooses create or update based on `isEditing`.
     *
     * @param values - Seat form data to submit.
     * @returns Parsed seat data.
     * @throws Error if server response is invalid or validation fails.
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
            logger.error("Invalid data received on fetch request: ", returnData);
            throw error;
        }

        return parsedData;
    };

    /**
     * Handles successful mutation.
     *
     * @param seat - The seat object returned from the server.
     */
    const onSuccess = async (seat: Seat) => {
        const actionDisplay = isEditing ? "updated" : "created";
        toast.success(successMessage || `Seat ${actionDisplay} successfully.`);
        onSubmitSuccess && onSubmitSuccess(seat);
    };

    /**
     * Handles mutation errors.
     *
     * @param error - The error thrown during the mutation.
     */
    const onError = (error: Error) => {
        const displayMessage = errorMessage ?? "Failed to submit seat data. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError && onSubmitError(error);
    };

    /**
     * Called after mutation is settled (success or error).
     * Invalidates queries to refresh seat data.
     */
    const onSettled = async () => {
        const keys = ["fetch_seats_by_query", "fetch_screen_seats_by_row"];
        await Promise.all(keys.map((key) => queryClient.invalidateQueries({queryKey: [key], exact: false})));
    };

    return useMutation({
        mutationKey,
        mutationFn: submitSeatData,
        onSuccess,
        onError,
        onSettled,
    });
}
