import {SeatsByRowForm, SeatsByRowFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import SeatSubmitRepository from "@/pages/seats/repositories/seat-submit-repository/SeatSubmitRepository.ts";
import {toast} from "react-toastify";
import {UseFormReturn} from "react-hook-form";
import handleMutationFormError from "@/common/utility/mutations/handleMutationFormError.ts";
import {SeatArraySchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import {SeatArray} from "@/pages/seats/schema/seat/Seat.types.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters for the {@link useSeatsByRowSubmitMutation} hook.
 */
type SubmitMutationParams = MutationOnSubmitParams<SeatArray> & {
    /** React Hook Form instance managing the form state. */
    form: UseFormReturn<SeatsByRowFormValues>;
};

/**
 * Custom hook to handle submitting seats by row.
 *
 * Integrates:
 * - React Hook Form for form state and validation.
 * - React Query for async mutation handling and caching.
 * - Repository layer for API submission.
 * - Toast notifications for success.
 * - Form error handling for failed submissions.
 *
 * Automatically invalidates relevant queries to keep the UI in sync.
 *
 * @param params - Submission parameters including form, success/error messages, and callbacks.
 * @returns React Query mutation object of type {@link UseMutationResult}.
 *
 * @example
 * ```ts
 * const mutation = useSeatsByRowSubmitMutation({
 *   form,
 *   successMessage: "Seats submitted successfully!",
 *   onSubmitSuccess: (data) => console.log("Created seats:", data),
 * });
 *
 * mutation.mutate(formValues);
 * ```
 */
export default function useSeatsByRowSubmitMutation(
    {form, successMessage, onSubmitSuccess, errorMessage, onSubmitError}: SubmitMutationParams
): UseMutationResult<SeatArray, unknown, SeatsByRowForm> {
    const queryClient = useQueryClient();

    const submitData = async (data: SeatsByRowForm) => {
        const action = () => SeatSubmitRepository.submitSeatsByRow({data});

        const returnData = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit seat data. Please try again.",
        });

        const {data: parsedData, success, error} = validateData({
            data: returnData,
            schema: SeatArraySchema,
            message: "Invalid data received. Please try again.",
        });

        if (!success) throw error;
        return parsedData;
    };

    const onSuccess = async (data: SeatArray) => {
        toast.success(successMessage ?? "Seats created successfully.");
        onSubmitSuccess?.(data);
    };

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Oops. Something went wrong. Please try again.";
        handleMutationFormError({error, form, displayMessage});
        onSubmitError?.(error);
    };

    const onSettled = async () => {
        await Promise.all([
            queryClient.invalidateQueries({queryKey: ["fetch_seats_by_query"], exact: false}),
            queryClient.invalidateQueries({queryKey: ["fetch_screen_seats_by_row"], exact: false}),
        ]);
    };

    return useMutation({
        mutationKey: ["submit_seats_by_row"],
        mutationFn: submitData,
        onSuccess,
        onError,
        onSettled,
    });
}
