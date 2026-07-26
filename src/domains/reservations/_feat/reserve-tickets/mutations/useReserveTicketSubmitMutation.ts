/**
 * @fileoverview Mutation hook for submitting ticket reservation data to the API.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {UseFormReturn} from "react-hook-form";
import {handleFormSubmitError, validateData} from "@/common/_feat";
import {ReserveTicketMutationKeys} from "./mutationKeys";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {
    PopulatedReservation,
    PopulatedReservationSchema,
    reserveTicket,
    ReserveTicketFormData,
    ReserveTicketFormValues
} from "@/domains/reservations";

/** Configuration parameters for the ticket reservation mutation. */
type SubmitParams = MutationResponseConfig<PopulatedReservation, ReserveTicketFormData> & {
    form: UseFormReturn<ReserveTicketFormValues, unknown, ReserveTicketFormData>;
};

/** React Query mutation hook for submitting and validating ticket reservations. */
export function useReserveTicketSubmitMutation(
    {form, ...onSubmitConfig}: SubmitParams
): UseMutationResult<PopulatedReservation, unknown, ReserveTicketFormData> {
    const reserveTickets = async (values: ReserveTicketFormData) => {
        onSubmitConfig.submitMessage && toast.success(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.(values);

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
        onSubmitConfig.successMessage && toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.(reservation);
    };

    const onError = (error: unknown) => {
        onSubmitConfig.errorMessage && toast.error(onSubmitConfig.errorMessage);
        handleFormSubmitError({form, error});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ReserveTicketMutationKeys.reserve(),
        mutationFn: reserveTickets,
        onSuccess,
        onError,
    });
}
