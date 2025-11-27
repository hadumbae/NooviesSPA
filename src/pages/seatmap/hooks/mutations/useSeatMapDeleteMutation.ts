/**
 * # useSeatMapDeleteMutation Hook
 *
 * A React Query mutation hook for deleting a seat map.
 * Handles:
 * - API deletion via `SeatMapRepository`
 * - Error handling using `handleMutationResponseError` and `useFetchErrorHandler`
 * - Success/error notifications via `react-toastify`
 * - Automatic invalidation of relevant queries on mutation settle
 *
 * ## Features
 * - Accepts optional callbacks for success and error events
 * - Provides customizable success and error messages
 * - Automatically invalidates seat map query caches after deletion
 */

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";

/**
 * ## useSeatMapDeleteMutation
 *
 * Hook for deleting a seat map by its ID.
 * Automatically handles query invalidation for relevant seat map queries
 * after the mutation settles.
 *
 * @param params - Configuration options for deletion:
 * - **onDeleteSuccess?** — callback executed after successful deletion
 * - **onDeleteError?** — callback executed when deletion fails
 * - **successMessage?** — custom message shown on successful deletion
 * - **errorMessage?** — custom message shown on error
 *
 * @returns A React Query mutation object with:
 * - `mutate` / `mutateAsync` — functions to trigger the deletion
 * - `isLoading` / `isSuccess` / `isError` — mutation state flags
 * - `error` — error object if deletion fails
 *
 * @example
 * const { mutate, isLoading } = useSeatMapDeleteMutation({
 *   successMessage: "Seat map removed successfully!",
 *   onDeleteSuccess: () => console.log("Deleted")
 * });
 *
 * mutate("64aef...b83f"); // Deletes seat map by ID
 */
export default function useSeatMapDeleteMutation(params: OnDeleteMutationParams) {
    const {onDeleteSuccess, onDeleteError, successMessage, errorMessage} = params;
    const queryClient = useQueryClient();

    const mutationKey = ['delete_single_seat_map'];

    const deleteSeatMap = async (seatMapID: string) => {
        const fetchQueryFn = () => SeatMapRepository.delete({_id: seatMapID});
        await useFetchErrorHandler({fetchQueryFn});
    };

    const onSuccess = async () => {
        toast.success(successMessage ?? "Seat Map Deleted.");
        onDeleteSuccess?.();
    }

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to delete seat map.";
        handleMutationResponseError({error, displayMessage});
        onDeleteError?.(error);
    }

    const onSettled = async () => {
        const queryKeys = [
            "fetch_seat_maps_by_query",
            "fetch_paginated_seat_maps_by_query",
        ];

        await Promise.all(
            queryKeys.map(queryKey => queryClient.invalidateQueries({queryKey: queryKey, exact: true}))
        );
    }

    return useMutation({
        mutationKey,
        mutationFn: deleteSeatMap,
        onSuccess,
        onError,
        onSettled,
    });
}
