import { UseFormReturn } from "react-hook-form";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import { TheatreSchema } from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import { Theatre } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import { TheatreForm, TheatreFormValues } from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import { toast } from "react-toastify";
import { ParseError } from "@/common/errors/ParseError.ts";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import { MutationEditByIDParams, MutationOnSubmitParams } from "@/common/type/form/MutationSubmitParams.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";

/**
 * Parameters for {@link useTheatreSubmitMutation}.
 *
 * Combines:
 * - {@link MutationOnSubmitParams} for success/error callbacks and messages
 * - {@link MutationEditByIDParams} for editing state and ID
 * - {@link UseFormReturn} for form handling
 *
 * @property form - The `react-hook-form` instance for the theatre form.
 */
export type TheatreSubmitMutationParams =
    MutationOnSubmitParams<Theatre> &
    MutationEditByIDParams & {
    form: UseFormReturn<TheatreFormValues>;
};

/**
 * Custom React hook to handle theatre form submission for both creating and updating theatres.
 *
 * Wraps `@tanstack/react-query`'s `useMutation` to:
 * - Submit theatre data to the API via {@link TheatreRepository}.
 * - Parse and validate returned data using {@link TheatreSchema}.
 * - Show toast notifications for success or error.
 * - Trigger optional success and error callbacks.
 * - Handle form errors using {@link handleMutationFormError}.
 * - Invalidate relevant queries after submission.
 *
 * @param params - Configuration and form handlers for the mutation.
 * @returns A `UseMutationResult` from `react-query` typed as `Theatre` for the result data,
 *          `Error` for possible errors, and `TheatreForm` as the input values.
 *
 * @example
 * ```ts
 * import useTheatreSubmitMutation from "@/pages/theatres/hooks/useTheatreSubmitMutation";
 * import { useForm } from "react-hook-form";
 *
 * const form = useForm<TheatreFormValues>();
 *
 * const mutation = useTheatreSubmitMutation({
 *   form,
 *   isEditing: false,
 *   successMessage: "Theatre created!",
 *   onSubmitSuccess: (data) => console.log("Created theatre:", data),
 *   onSubmitError: (err) => console.error(err),
 * });
 *
 * // Submitting the form
 * mutation.mutate(form.getValues());
 * ```
 *
 * @see {@link TheatreRepository}
 * @see {@link TheatreSchema}
 * @see {@link handleMutationFormError}
 */
export default function useTheatreSubmitMutation(
    params: TheatreSubmitMutationParams
): UseMutationResult<Theatre, unknown, TheatreForm> {
    const {
        successMessage,
        onSubmitSuccess,
        errorMessage,
        onSubmitError,
        isEditing,
        _id,
        form,
    } = params;

    const mutationKey = ['submit_theatre_data'];
    const queryClient = useQueryClient();

    /**
     * Mutation function to submit theatre data.
     * - Calls create or update based on `isEditing`.
     * - Validates returned data using {@link TheatreSchema}.
     * - Throws {@link ParseError} if data is invalid.
     */
    const submitTheatreData = async (values: TheatreForm) => {
        const action = isEditing
            ? () => TheatreRepository.update({ _id, data: values })
            : () => TheatreRepository.create({ data: values });

        const returnData = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again.",
        });

        const { success, data: parsedData, error } = TheatreSchema.safeParse(returnData);

        if (!success) {
            toast.error("Invalid data returned. Please try again.");
            throw new ParseError({ errors: error?.errors, message: "Invalid Theatre Data." });
        }

        return parsedData;
    }

    /**
     * Called on successful mutation.
     * - Shows success toast
     * - Calls optional `onSubmitSuccess` callback
     */
    const onSuccess = (theatre: Theatre) => {
        const message = isEditing ? "Theatre updated." : "Theatre created.";
        toast.success(successMessage || message);
        onSubmitSuccess?.(theatre);
    }

    /**
     * Called on mutation error.
     * - Shows error toast
     * - Handles form errors using {@link handleMutationFormError}
     * - Calls optional `onSubmitError` callback
     */
    const onError = (error: unknown) => {
        toast.error(errorMessage || "Oops. Something went wrong.");
        handleMutationFormError({ form, error });
        onSubmitError?.(error);
    }

    /**
     * Called when the mutation is settled (either success or error).
     * - Invalidates queries for single theatre and theatre lists.
     */
    const onSettled = async () => {
        await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["fetch_single_theatre"], exact: false }),
            queryClient.invalidateQueries({ queryKey: ["fetch_theatres_by_query"], exact: false }),
        ]);
    }

    return useMutation({
        mutationKey,
        mutationFn: submitTheatreData,
        onSuccess,
        onError,
        onSettled,
    });
}
