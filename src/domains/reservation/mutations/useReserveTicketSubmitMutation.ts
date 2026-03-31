/**
 * @file useReserveTicketSubmitMutation.ts
 *
 * @summary
 * React Query mutation hook for submitting ticket reservation checkouts.
 *
 * @description
 * Orchestrates the full client-side reservation submission lifecycle:
 * - Submits validated reservation form data to the API
 * - Validates the returned reservation payload
 * - Handles success and error side effects (toasts, form errors, callbacks)
 *
 * This hook acts as the bridge between form state, repository calls,
 * runtime schema validation, and UI feedback.
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ReserveTicketForm} from "@/domains/reservation/schema/forms/ReserveTicketFormSchema.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {UseFormReturn} from "react-hook-form";
import {ReserveTicketFormValues} from "@/domains/reservation/schema/forms/ReserveTicketFormValuesSchema.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {PopulatedReservation, PopulatedReservationSchema} from "@/domains/reservation/schema/model";
import {reserveTicket} from "@/domains/reservation/repositories/ticket-repository";

/**
 * Parameters required to configure the reservation submission mutation.
 *
 * @remarks
 * Extends generic mutation submission parameters with
 * form instance access for error handling.
 */
type SubmitParams = MutationOnSubmitParams<PopulatedReservation> & {
    /** React Hook Form instance for error binding. */
    form: UseFormReturn<ReserveTicketFormValues>;
};

/**
 * Ticket reservation submission mutation hook.
 * @param params - Mutation configuration and form handlers
 * @returns React Query mutation result
 */
export function useReserveTicketSubmitMutation(
    {form, onSubmitSuccess, onSubmitError, successMessage, errorMessage}: SubmitParams
): UseMutationResult<PopulatedReservation, unknown, ReserveTicketForm> {

    /**
     * Executes the reservation checkout request and validates the response.
     *
     * @param values - Validated reservation form data
     * @returns Parsed reservation details
     * @throws Validation or request errors
     */
    const reserveTickets = async (values: ReserveTicketForm) => {
        const returnedData = await handleMutationResponse({
            action: () => reserveTicket(values),
            errorMessage: "Failed to reserve tickets. Please try again.",
        });

        const {data: parsedData, success, error} = validateData({
            data: returnedData,
            schema: PopulatedReservationSchema,
            message: "Invalid data.",
        });

        if (!success) throw error;
        return parsedData;
    };

    /**
     * Success handler for reservation submission.
     */
    const onSuccess = (reservation: PopulatedReservation) => {
        successMessage && toast.success(successMessage);
        onSubmitSuccess?.(reservation);
    };

    /**
     * Error handler for reservation submission.
     */
    const onError = (error: unknown) => {
        errorMessage && toast.error(errorMessage);
        handleMutationFormError({form, error});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["reservations", "tickets", "reserve"],
        mutationFn: reserveTickets,
        onSuccess,
        onError,
    });
}
