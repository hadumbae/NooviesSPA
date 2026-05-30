/**
 * @fileoverview Error handler hook for administrative reservation update mutations.
 */

import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {UseFormReturn} from "react-hook-form";
import {
    UpdateReservationNotesFormSubmit,
    UpdateReservationNotesFormValues
} from "@/domains/reservation/_feat/update-reservations/hooks/forms";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {parseErrorReturns} from "@/common/utility/parseErrorReturns.ts";

/** Configuration parameters for the reservation error handler. */
type HandlerParams = {
    form: UseFormReturn<UpdateReservationNotesFormSubmit, unknown, UpdateReservationNotesFormValues>;
    errorMessage?: string;
    onSubmitError?: (error: unknown) => void;
}

/** Generates a standardized error handling function for reservation mutations. */
export function useUpdateAdminReservationErrorHandler(
    {form, onSubmitError, errorMessage}: HandlerParams,
): (error: unknown) => void {
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