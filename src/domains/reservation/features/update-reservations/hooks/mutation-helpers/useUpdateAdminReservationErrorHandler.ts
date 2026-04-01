/**
 * @file Reusable error handler hook for administrative reservation update mutations.
 * @filename useUpdateAdminReservationErrorHandler.ts
 */

import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {UseFormReturn} from "react-hook-form";
import {UpdateReservationNotesFormSubmit} from "@/domains/reservation/features/update-reservations/schemas";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {parseErrorReturns} from "@/common/utility/parseErrorReturns.ts";

/**
 * Configuration parameters for the reservation error handler.
 */
type HandlerParams = {
    /** The React Hook Form instance used for mapping server-side validation issues to UI fields. */
    form: UseFormReturn<UpdateReservationNotesFormSubmit>;

    /** * Optional static error message.
     * If provided, this will be displayed as a toast notification regardless of the error type.
     */
    errorMessage?: string;

    /** * Optional custom side-effect callback.
     * Executed at the end of the handling logic to allow parent components to respond to the failure.
     */
    onSubmitError?: (error: unknown) => void;
}

/**
 * A specialized hook that generates a standardized error handling function for reservation mutations.
 * @param params - Configuration for UI feedback and form state management.
 * @returns A memoized-style handler function compatible with TanStack Query's `onError` callback.
 */
export function useUpdateAdminReservationErrorHandler(
    {form, onSubmitError, errorMessage}: HandlerParams,
) {
    /**
     * The generated error handler function.
     * @param error - The error caught by the mutation or fetch operation.
     */
    return (error: unknown) => {
        if (errorMessage) {
            toast.error(errorMessage);
        }

        if (error instanceof HttpResponseError) {
            const payload = parseErrorReturns(error.payload);
            toast.error(payload?.message ?? `Request failed with status: ${error.status}`);
        } else {
            handleMutationFormError({error, form});
        }

        onSubmitError?.(error);
    };
}