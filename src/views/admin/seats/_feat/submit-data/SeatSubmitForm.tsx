/**
 * @fileoverview Orchestrator for seat creation and updates, handling form initialization and mutation logic.
 */

import {ReactElement, ReactNode} from "react";
import {Form} from "@/common/components/ui";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {
    handleSubmitResponseError
} from "@/common/_feat/error-handling/handleSubmitResponseError.ts";
import {FormValuesConfig, MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import {handleFormSubmitError} from "@/common/_feat/error-handling/handleFormSubmitError.ts";

import {
    Seat,
    SeatDetails,
    SeatFormData,
    SeatFormValues,
    useSeatSubmitForm,
    useSeatSubmitMutation
} from "@/domains/seats";

/** Props for the SeatSubmitForm component. */
type FormProps = MutationResponseConfig<SeatDetails, SeatFormValues> & MutationFormResetConfig & {
    formConfig?: FormValuesConfig<SeatFormValues, Seat>;
    children: ReactNode;
}

/**
 * Manages the submission lifecycle for seat data, integrating mutation hooks with a unified form provider.
 */
export function SeatSubmitForm(
    {children, formConfig, ...submitConfig}: FormProps
): ReactElement {
    const formID = useGenerateFormID("theatre-seat-submit-form");

    const form = useSeatSubmitForm(formConfig);
    const {mutateAsync, isPending, isError} = useSeatSubmitMutation();

    const submitSeatData = async (values: SeatFormData) => {
        try {
            handleMutationCallback({
                cb: () => submitConfig.onSubmit?.(values),
                message: submitConfig.submitMessage,
            });

            const seat = await mutateAsync(values);

            handleMutationCallback({
                cb: () => submitConfig.onSubmitSuccess?.(seat),
                message: submitConfig.successMessage,
                messageType: "success",
            });
        } catch (error: unknown) {
            handleFormSubmitError({form, error, displayMessage: submitConfig.errorMessage})
            submitConfig.onSubmitError?.(error);
        }
    }

    return (
        <BaseFormContextProvider
            formID={formID}
            isPending={isPending}
            isError={isError}
            submitHandler={handleSubmitResponseError}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(submitSeatData)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}