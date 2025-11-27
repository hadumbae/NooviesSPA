/**
 * React Query mutation hook used to create seat maps for a specific showing.
 *
 * This hook handles:
 * - Triggering the creation request via the `SeatMapShowingRepository`
 * - Handling success and error toast notifications
 * - Calling user-provided submit callbacks
 * - Invalidating related React Query caches after completion
 *
 * Typical usage is inside a form submission handler where you want to
 * programmatically create seat maps for a showing and refresh dependent data.
 */

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import SeatMapShowingRepository from "@/pages/seatmap/repositories/SeatMapShowingRepository.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";

/**
 * Parameters for `useShowingSeatMapSubmitMutation`.
 *
 * @remarks
 * This is similar to `MutationOnSubmitParams`, but requires an `onSubmitSuccess`
 * callback with no arguments and introduces `showingID`.
 */
type HookParams = Omit<MutationOnSubmitParams, "onSubmitSuccess"> & {
    /**
     * Callback fired when the mutation succeeds.
     */
    onSubmitSuccess: () => void;

    /**
     * The ID of the showing for which seat maps should be created.
     */
    showingID: string;
};

/**
 * A React Query mutation hook used to create seat maps for a specified showing.
 *
 * @param params - Mutation configuration including callbacks and the showing ID.
 *
 * @returns A fully configured `useMutation` instance for triggering request
 * execution and tracking state.
 *
 * @example
 * ```ts
 * const { mutate, isPending } = useShowingSeatMapSubmitMutation({
 *   showingID: "showing_123",
 *   onSubmitSuccess: () => console.log("Created"),
 *   successMessage: "Seat maps created!",
 * });
 *
 * mutate();
 * ```
 */
export default function useShowingSeatMapSubmitMutation(params: HookParams) {
    const {showingID, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;
    const queryClient = useQueryClient();

    const mutationKey = ['create_showing_seat_map'];

    /**
     * Executes the seat map creation request.
     * Wrapped in `handleMutationResponse` for validation and error normalization.
     */
    const createSeatMaps = async () => {
        await handleMutationResponse({
            action: () => SeatMapShowingRepository.createSeatMap({showingID}),
            errorMessage: "Invalid data received. Please try again.",
        });
    };

    /**
     * Success handler invoked by React Query.
     */
    const onSuccess = () => {
        toast.success(successMessage ?? "Seat Map for showing created successfully.");
        onSubmitSuccess?.();
    };

    /**
     * Error handler invoked by React Query.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to create seat map for showing. Please try again.";
        handleMutationResponseError({error, displayMessage});
        onSubmitError?.(error);
    };

    /**
     * Invalidates related caches after mutation settles.
     */
    const onSettled = async () => {
        const queryKeys = [
            "fetch_seat_maps_by_query",
            "fetch_paginated_seat_maps_by_query",
        ];

        await Promise.all(
            queryKeys.map(queryKey => queryClient.invalidateQueries({queryKey: queryKey, exact: true}))
        );
    };

    return useMutation({
        mutationKey,
        mutationFn: createSeatMaps,
        onSuccess,
        onError,
        onSettled,
    });
}
