/**
 * @fileoverview Hook for handling reservation update form submissions and mutation lifecycle callbacks.
 */

import {FieldValues, UseFormReturn} from "react-hook-form";
import {AdminReservation} from "@/domains/reservations/_schema";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import {handleFormSubmitError} from "@/common/_feat/error-handling/handleFormSubmitError.ts";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";

/** Configuration for the reservation update submission handler. */
type HandlerConfig<TFormValues extends FieldValues, TForm extends TFormValues = TFormValues> =
    MutationResponseConfig<AdminReservation, TForm> & MutationFormResetConfig & {
    form: UseFormReturn<TFormValues, unknown, TForm>;
    submitData: (data: TForm) => Promise<AdminReservation>;
};

/** Creates a submission handler that manages loading states, success resets, and error mapping for reservation updates. */
export function useUpdateReservationSubmitHandler<TFormValues extends FieldValues, TForm extends TFormValues = TFormValues>(
    {form, submitData, ...submitConfig}: HandlerConfig<TFormValues, TForm>
): (data: TForm) => Promise<void> {
    return async (values: TForm) => {
        handleMutationCallback({
            message: submitConfig.submitMessage,
            cb: () => submitConfig.onSubmit?.(values),
        });

        try {
            const result = await submitData(values);
            submitConfig.resetOnSuccess && form.reset();

            handleMutationCallback({
                messageType: "success",
                message: submitConfig.successMessage,
                cb: () => submitConfig.onSubmitSuccess?.(result),
            });
        } catch (error: unknown) {
            handleFormSubmitError({form, error, displayMessage: submitConfig.errorMessage})
            submitConfig.onSubmitError?.(error);
        }
    };
}