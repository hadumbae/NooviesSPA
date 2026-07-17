/**
 * @fileoverview Form wrapper component for submitting seat map data to the API.
 */

import {ReactElement, ReactNode} from "react";
import {Form} from "@/common/components/ui";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import {handleFormSubmitError} from "@/common/_feat/error-handling/handleFormSubmitError.ts";
import {FormValuesConfig, MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";

import {
    SeatMap,
    SeatMapDetails,
    SeatMapFormData,
    SeatMapFormValues,
    useSeatMapForm,
    useSeatMapSubmitMutation
} from "@/domains/seatmaps";

/** Props for the SeatMapSubmitForm component. */
type FormProps = MutationResponseConfig<SeatMapDetails, SeatMapFormData> & MutationFormResetConfig & {
    formConfig?: FormValuesConfig<SeatMapFormValues, SeatMap>;
    children: ReactNode;
};

/**
 * Handles the submission logic and state management for seat map creation and updates.
 */
export function SeatMapSubmitForm(
    {children, formConfig, ...submitConfig}: FormProps
): ReactElement {
    const formID = useGenerateFormID("seat-map-submti-form");

    const form = useSeatMapForm(formConfig);
    const {mutateAsync, isPending, isError} = useSeatMapSubmitMutation();

    const submitSeatMap = async (values: SeatMapFormData) => {
        try {
            handleMutationCallback({
                cb: () => submitConfig.onSubmit?.(values),
                message: submitConfig.submitMessage,
            });

            const seatMap = await mutateAsync(values);

            handleMutationCallback({
                cb: () => submitConfig.onSubmitSuccess?.(seatMap),
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
            isEditing={!!formConfig?.editEntity}
            submitHandler={submitSeatMap}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitSeatMap)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}
