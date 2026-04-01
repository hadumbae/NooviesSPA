/**
 * @file Reusable error handler hook for administrative reservation update mutations.
 * @filename useUpdateAdminReservationErrorHandler.ts
 */

import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {UseFormReturn} from "react-hook-form";
import {UpdateReservationNotesFormSubmit} from "@/domains/reservation/features/update-reservations/schemas";

/**
 * Configuration parameters for the reservation error handler.
 */
type HandlerParams = {
    /** The React Hook Form instance to which server-side errors will be mapped. */
    form: UseFormReturn<UpdateReservationNotesFormSubmit>;
    /** Optional custom message to display in the error toast. */
    errorMessage?: string;
    /** Optional callback executed after the error has been processed. */
    onSubmitError?: (error: unknown) => void;
}

/**
 * A specialized hook that returns a standardized error handling function
 * for reservation-related mutations.
 * @param params - Form context and error feedback configuration.
 * @returns A function that accepts an `unknown` error and processes it for the UI.
 */
export function useUpdateAdminReservationErrorHandler(
    {form, onSubmitError, errorMessage}: HandlerParams,
) {
    return (error: unknown) => {
        if (errorMessage) toast.error(errorMessage);
        handleMutationFormError({error, form});
        onSubmitError?.(error);
    };
}