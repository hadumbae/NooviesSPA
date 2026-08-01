/**
 * @fileoverview Form container for creating and updating movie showings.
 *
 */

import {ReactElement, ReactNode, useId} from "react";
import {IANATimezone} from "@/common/_schemas/time/IANATimezoneSchema.ts";
import {Showing} from "@/domains/showings/_schema/showing/ShowingSchema.ts";
import {ShowingDetails} from "@/domains/showings/_schema/showing/ShowingDetailsSchema.ts";
import {ShowingFormData, ShowingFormValues} from "@/domains/showings/_schema/form";
import {useShowingSubmitMutation} from "@/domains/showings/_feat/crud-hooks";
import {useShowingSubmitForm} from "@/domains/showings/_feat/submit-data";
import {Form} from "@/views/common/_comp/ui/form.tsx";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {BaseMultiStepFormContextProvider} from "@/views/common/_feat/multi-step-form";
import {handleFormSubmitError, handleMutationCallback} from "@/common/_feat";

/** Props for the ShowingSubmitForm component when editing or creating. */
type ShowingEditingProps =
    | { showing: Showing; theatreTimezone: IANATimezone }
    | { showing?: never; theatreTimezone?: never };

/** Props for the ShowingSubmitForm component. */
type SubmitContainerProps =
    ShowingEditingProps &
    MutationResponseConfig<ShowingDetails, ShowingFormData> &
    MutationFormResetConfig & {
    presetValues?: Partial<ShowingFormValues>;
    children: ReactNode;
};

/** Multi-step form container that manages showing submission logic and state persistence. */
export function ShowingSubmitForm(
    {children, showing, theatreTimezone, presetValues, ...onSubmitConfig}: SubmitContainerProps
): ReactElement {
    const id = useId();
    const formID = `showing-submit-form-${id}`;
    const localStorageKey = "showing-submit-form-data";

    const formProps = showing ? {showing, theatreTimezone} : {};
    const form = useShowingSubmitForm({presetValues, ...formProps});

    const {mutateAsync} = useShowingSubmitMutation();

    const onFormSubmit = async (values: ShowingFormData) => {
        try {
            handleMutationCallback({
                message: onSubmitConfig?.submitMessage,
                cb: () => onSubmitConfig?.onSubmit?.(values),
            });

            const showing = await mutateAsync(values);
            onSubmitConfig?.resetOnSuccess && form.reset();

            handleMutationCallback({
                message: onSubmitConfig?.successMessage,
                cb: () => onSubmitConfig?.onSubmitSuccess?.(showing),
                messageType: "success",
            });
        } catch (error: unknown) {
            onSubmitConfig?.resetOnError && form.reset();
            handleFormSubmitError({form, error, displayMessage: onSubmitConfig?.errorMessage});
            onSubmitConfig?.onSubmitError?.(error);
        }
    };

    return (
        <BaseMultiStepFormContextProvider
            formID={formID}
            localStorageKey={localStorageKey}
            storageType="session"
            useStorage={!showing}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(onFormSubmit)}>
                    {children}
                </form>
            </Form>
        </BaseMultiStepFormContextProvider>
    );
}
