/**
 * # useSeatMapUpdateAvailabilityMutation Hook
 *
 * A React Query mutation hook for toggling the availability status of a seat map.
 * Handles:
 * - API request via `SeatMapShowingRepository.toggleSeatMapAvailability`
 * - Validation of the response using `SeatMapSchema`
 * - Error handling with `handleMutationResponseError`
 * - Success notifications via `react-toastify`
 * - Automatic invalidation of relevant seat map queries after the mutation settles
 *
 * ## Features
 * - Accepts optional callbacks for success and error events
 * - Provides customizable success and error messages
 * - Automatically refreshes cached seat map data after updating availability
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import SeatMapShowingRepository from "@/pages/seatmap/repositories/SeatMapShowingRepository.ts";
import {toast} from "react-toastify";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {SeatMapSchema} from "@/pages/seatmap/schema/model/SeatMap.schema.ts";
import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";

/**
 * ## useSeatMapUpdateAvailabilityMutation
 *
 * Hook for toggling a seat map's availability by its ID.
 * Automatically handles query invalidation for relevant seat map queries
 * after the mutation settles.
 *
 * @param params - Optional configuration for the mutation:
 * - **onSubmitSuccess?** — callback executed after successful availability toggle
 * - **onSubmitError?** — callback executed when toggle fails
 * - **successMessage?** — custom message shown on successful toggle
 * - **errorMessage?** — custom message shown on error
 *
 * @returns A `UseMutationResult<SeatMap, unknown, string>` from React Query, including:
 * - `mutate` / `mutateAsync` — functions to trigger the availability toggle
 * - `data` — the returned seat map after successful toggle
 * - `isLoading` / `isSuccess` / `isError` — mutation state flags
 * - `error` — error object if the mutation fails
 *
 * @example
 * const { mutate, isLoading } = useSeatMapUpdateAvailabilityMutation({
 *   successMessage: "Seat availability updated successfully!",
 *   onSubmitSuccess: (seatMap) => console.log("Updated:", seatMap)
 * });
 *
 * mutate("64aef...b83f"); // Toggle availability for seat map by ID
 */
export default function useSeatMapUpdateAvailabilityMutation(
    params: MutationOnSubmitParams<SeatMap> = {}
): UseMutationResult<SeatMap, unknown, string> {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;
    const queryClient = useQueryClient();

    const mutationKey = ['toggle_seat_map_availability'];

    const toggleAvailability = async (seatMapID: string) => {
        const {result} = await SeatMapShowingRepository.toggleSeatMapAvailability({seatMapID});

        const {data, success, error} = validateData({data: result, schema: SeatMapSchema});

        if (!success) {
            throw error;
        }

        return data;
    }

    const onSuccess = (seatMap: SeatMap) => {
        toast.success(successMessage ?? "Seat Map updated.");
        onSubmitSuccess?.(seatMap);
    }

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to toggle seat availability. Please try again.";
        handleMutationResponseError({error, displayMessage});
        onSubmitError?.(error);
    }

    const onSettled = async () => {
        const queryKeys = [
            "fetch_single_seat_map",
            "fetch_seat_maps_by_query",
            "fetch_paginated_seat_maps_by_query",
        ];

        await Promise.all(
            queryKeys.map(queryKey => queryClient.invalidateQueries({queryKey: queryKey, exact: true}))
        );
    }

    return useMutation({
        mutationKey,
        mutationFn: toggleAvailability,
        onSuccess,
        onError,
        onSettled,
    });
}
