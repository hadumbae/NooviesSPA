/**
 * @fileoverview Mutation hook for submitting ticket reservation data to the API.
 *
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {handleFormSubmitError} from "@/common/_feat/error-handling/handleFormSubmitError.ts";
import {UseFormReturn} from "react-hook-form";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {reserveTicket} from "@/domains/reservations/_feat/reserve-tickets/repository";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {ReserveTicketFormData, ReserveTicketFormValues} from "@/domains/reservations/_feat/reserve-tickets/schema";
import {
    PopulatedReservation, PopulatedReservationSchema
} from "@/domains/reservations/_schema/model/populated-reservations/PopulatedReservationSchema.ts";
import { ReserveTicketMutationKeys } from "./mutationKeys";

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
