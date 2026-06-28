/**
 * @fileoverview Mutation hook for resetting reservation expiration (TTL) using centralized handlers.
 *
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";

import {AdminReservation, AdminReservationSchema} from "@/domains/reservation/_schema";
import {FetchByCodeQueryKeys} from "@/domains/reservation/_feat/fetch-reservation-by-code";
import {patchResetReservationExpiry} from "@/domains/reservation/_feat/update-reservations/repository";
import {ReservationUpdateMutationKeys} from "@/domains/reservation/_feat/update-reservations/mutations/mutationKeys.ts";

/** Props for the useResetReservationExpiryMutation hook. */
export type MutationProps = {
    reservationID: ObjectId;
}

/**
 * TanStack Query mutation hook that extends the Time-To-Live (TTL) of a reservation.
 */
export function useResetReservationExpiryMutation(
    {reservationID}: MutationProps
): UseMutationResult<AdminReservation, unknown, void> {
    const queryClient = useQueryClient();

    const resetExpiry = async () => {
        const {result} = await patchResetReservationExpiry({_id: reservationID});

        const {success, data, error} = validateData({
            data: result,
            schema: AdminReservationSchema,
            message: "Invalid data structure returned after resetting reservation expiry.",
        });

        if (!success) throw error;
        return data;
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: FetchByCodeQueryKeys.fetchByCode(), exact: false});
    }

    return useMutation({
        mutationKey: ReservationUpdateMutationKeys.expiry({reservationID}),
        mutationFn: resetExpiry,
        onSuccess,
    });
}