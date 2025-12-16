import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import {toast} from "react-toastify";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {SeatMapDetailsSchema} from "@/pages/seatmap/schema/model/SeatMap.schema.ts";
import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {SeatMapForm, SeatMapFormValues} from "@/pages/seatmap/schema/form/SeatMapForm.types.ts";
import {SubmitMutationParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters for submitting a SeatMap form mutation.
 *
 * Wraps common mutation options such as:
 * - React Hook Form instance
 * - Optional edit identifier
 * - Success and error callbacks
 * - Custom success/error messages
 */
type FormSubmitParams = SubmitMutationParams<SeatMapFormValues, SeatMapDetails>;

/**
 * Return type for the SeatMap submit mutation hook.
 *
 * Exposes the full React Query mutation result,
 * including status flags and mutation helpers.
 */
type FormSubmitReturns = UseMutationResult<SeatMapDetails, unknown, SeatMapForm>;

/**
 * Handles creation and updating of SeatMap entities via form submission.
 *
 * This hook:
 * - Automatically selects create vs update based on `editID`
 * - Validates API responses using {@link SeatMapDetailsSchema}
 * - Displays toast notifications on success
 * - Maps server or validation errors back onto the form
 * - Invalidates relevant SeatMap query caches on completion
 *
 * Designed to be used alongside React Hook Form and TanStack Query
 * for consistent mutation handling.
 *
 * @param params - Configuration options for form submission and callbacks.
 *
 * @returns
 * A {@link UseMutationResult} configured for submitting SeatMap data.
 */
export default function useSeatMapSubmitMutation(params: FormSubmitParams): FormSubmitReturns {
    const {form, editID, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    const mutationKey = ['submit_single_seat_map'];
    const queryClient = useQueryClient();
    const queryOptions = {populate: true, virtuals: true};

    /**
     * Mutation execution function.
     *
     * Resolves whether to create or update a SeatMap,
     * performs schema validation on the response,
     * and throws on validation failure to trigger `onError`.
     */
    const mutationFn = async (values: SeatMapForm) => {
        const action = editID
            ? () => SeatMapRepository.update({_id: editID, data: values, ...queryOptions})
            : () => SeatMapRepository.create({data: values, ...queryOptions});

        const {result} = await action();

        const {data, success, error} = validateData({
            data: result,
            schema: SeatMapDetailsSchema,
            message: "Failed to submit seat map data.",
        });

        if (!success) {
            throw error;
        }

        return data;
    };

    /**
     * Success handler for SeatMap submission.
     *
     * Displays a toast notification and invokes
     * the optional `onSubmitSuccess` callback.
     */
    const onSuccess = (seatMap: SeatMapDetails) => {
        toast.success(successMessage ?? "Success! Seat Map submitted.");
        onSubmitSuccess?.(seatMap);
    };

    /**
     * Error handler for SeatMap submission.
     *
     * Maps errors onto the form when applicable,
     * displays a fallback error message,
     * and invokes the optional `onSubmitError` callback.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to submit seat map data. Please try again.";
        handleMutationFormError({error, form, displayMessage});
        onSubmitError?.(error);
    };

    /**
     * Cleanup handler executed after mutation completion.
     *
     * Invalidates all relevant SeatMap-related queries
     * to ensure fresh data across the application.
     */
    const onSettled = async () => {
        const queryKeys = [
            "fetch_single_seat_map",
            "fetch_seat_maps_by_query",
            "fetch_paginated_seat_maps_by_query",
        ];

        await Promise.all(
            queryKeys.map(queryKey =>
                queryClient.invalidateQueries({queryKey: queryKey, exact: true})
            )
        );
    };

    return useMutation({
        mutationKey,
        mutationFn,
        onSuccess,
        onError,
        onSettled,
    });
}
