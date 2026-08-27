/**
 * @fileoverview Mutation hook for submitting ticket reservation data to the API.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {validateData} from "@/common/_feat";
import {ReserveTicketMutationKeys} from "./mutationKeys";
import {PopulatedReservation, PopulatedReservationSchema,} from "@/domains/reservations/_schema/model";
import {ReserveTicketFormData} from "@/domains/reservations/_feat/reserve-tickets/schema";
import {postReserveTicket} from "@/domains/reservations/_feat/reserve-tickets/repository";

/** React Query mutation hook for submitting and validating ticket reservations. */
export function useReserveTicketSubmitMutation(): UseMutationResult<PopulatedReservation, unknown, ReserveTicketFormData> {
    const reserveTickets = async (values: ReserveTicketFormData) => {
        const {result} = await postReserveTicket(values);

        const {data: parsedData, success, error} = validateData({
            data: result,
            schema: PopulatedReservationSchema,
            message: "Invalid data.",
        });

        if (!success) throw error;
        return parsedData;
    };

    return useMutation({
        mutationKey: ReserveTicketMutationKeys.reserve(),
        mutationFn: reserveTickets,
    });
}
