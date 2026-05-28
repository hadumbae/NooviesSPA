/**
 * @fileoverview Mutation hook for submitting ticket reservation data to the API.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {UseFormReturn} from "react-hook-form";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {PopulatedReservation, PopulatedReservationSchema} from "@/domains/reservation/schema/model";
import {reserveTicket} from "@/domains/reservation/repositories/ticket-repository";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {ReserveTicketFormData, ReserveTicketFormValues} from "@/domains/reservation/_feat/reserve-tickets/schema";

/** Configuration parameters for the ticket reservation mutation. */
type SubmitParams = MutationResponseConfig<PopulatedReservation> & {
    form: UseFormReturn<ReserveTicketFormValues, unknown, ReserveTicketFormData>;
};

/** React Query mutation hook for submitting and validating ticket reservations. */
export function useReserveTicketSubmitMutation(
    {form, onSubmitSuccess, onSubmitError, successMessage, errorMessage}: SubmitParams
): UseMutationResult<PopulatedReservation, unknown, ReserveTicketFormData> {
    const reserveTickets = async (values: ReserveTicketFormData) => {
        const {result} = await reserveTicket(values);

        const {data: parsedData, success, error} = validateData({
            data: result,
            schema: PopulatedReservationSchema,
            message: "Invalid data.",
        });

        if (!success) throw error;
        return parsedData;
    };

    const onSuccess = (reservation: PopulatedReservation) => {
        successMessage && toast.success(successMessage);
        onSubmitSuccess?.(reservation);
    };

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
