/**
 * # useSeatMapSubmitMutation Hook
 *
 * A React Query mutation hook for submitting seat map data.
 * Handles both creation and editing of seat maps, with:
 * - Form validation via Zod schema (`SeatMapSchema`)
 * - Error handling using `handleMutationFormError`
 * - Success/error notifications via `react-toastify`
 * - Automatic query invalidation on mutation settle
 *
 * ## Features
 * - Supports editing an existing seat map or creating a new one
 * - Validates API response data before returning
 * - Integrates with `react-hook-form` for form state management
 * - Provides callbacks for success, error, and settled states
 * - Automatically invalidates relevant queries to refresh stale data
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import {toast} from "react-toastify";
import {UseFormReturn} from "react-hook-form";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MutationEditByIDParams, MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {SeatMapSchema} from "@/pages/seatmap/schema/model/SeatMap.schema.ts";
import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {SeatMapForm} from "@/pages/seatmap/schema/form/SeatMapForm.types.ts";

/**
 * ## FormSubmitParams
 *
 * Parameters accepted by `useSeatMapSubmitMutation`.
 *
 * Combines:
 * - `MutationOnSubmitParams<SeatMap>` — optional callbacks, success/error messages
 * - `MutationEditByIDParams` — editing-specific options like `_id` and `isEditing`
 * - `form` — the `react-hook-form` object for managing form state
 *
 * @example
 * const params: FormSubmitParams = {
 *   form: seatMapForm,
 *   isEditing: true,
 *   _id: "64aef...b83f",
 *   successMessage: "Seat map updated successfully!",
 *   onSubmitSuccess: (seatMap) => console.log("Updated:", seatMap)
 * };
 */
type FormSubmitParams = MutationOnSubmitParams<SeatMap> & MutationEditByIDParams & {
    /** React Hook Form object for managing the seat map form state */
    form: UseFormReturn<SeatMapForm>;
};

/**
 * ## useSeatMapSubmitMutation
 *
 * Hook for submitting a seat map form.
 * Supports creating a new seat map or editing an existing one.
 * On mutation settle, relevant queries are automatically invalidated to
 * refresh stale data.
 *
 * @param params - The form submission parameters and optional callbacks/messages.
 *
 * @returns A `UseMutationResult<SeatMap, unknown, SeatMapForm>` from React Query, including:
 * - `mutate` / `mutateAsync` — functions to trigger the mutation
 * - `data` — the returned seat map after successful submission
 * - `isLoading` / `isSuccess` / `isError` — mutation state flags
 * - `error` — error object if the mutation fails
 *
 * @example
 * const { mutate, isLoading, error } = useSeatMapSubmitMutation({
 *   form: seatMapForm,
 *   isEditing: false,
 *   successMessage: "Seat map created successfully!"
 * });
 *
 * mutate({ seat: "A1", showing: "S1", price: 150, status: "AVAILABLE" });
 *
 * // The following queries will automatically be invalidated on mutation settle:
 * // - "fetch_single_seat_map"
 * // - "fetch_seat_maps_by_query"
 * // - "fetch_paginated_seat_maps_by_query"
 */
export default function useSeatMapSubmitMutation(
    params: FormSubmitParams
): UseMutationResult<SeatMap, unknown, SeatMapForm> {
    const {form, isEditing, _id, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;
    const queryClient = useQueryClient();

    const mutationKey = ['submit_single_seat_map'];

    const mutationFn = async (values: SeatMapForm) => {
        const action = isEditing
            ? () => SeatMapRepository.update({_id, data: values})
            : () => SeatMapRepository.create({data: values});

        const {result} = await action();

        const {data, success, error} = validateData({
            data: result,
            schema: SeatMapSchema,
            message: "Failed to submit seat map data.",
        });

        if (!success) {
            throw error;
        }

        return data;
    };

    const onSuccess = (seatMap: SeatMap) => {
        toast.success(successMessage ?? "Success! Seat Map submitted.");
        onSubmitSuccess?.(seatMap);
    };

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to submit seat map data. Please try again.";
        handleMutationFormError({error, form, displayMessage});
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
        mutationFn,
        onSuccess,
        onError,
        onSettled,
    });
}
