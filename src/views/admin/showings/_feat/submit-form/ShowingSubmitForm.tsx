/**
 * @fileoverview Form container for creating and updating movie showings.
 *
 */

import {ReactElement, ReactNode, useId} from "react";
import {IANATimezone} from "@/common/schema/date-time/IANATimezone.schema.ts";
import buildFormSubmitLog from "@/common/utility/features/logger/buildFormSubmitLog.ts";
import {Showing} from "@/domains/showings/schema/showing/ShowingSchema.ts";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {ShowingFormData} from "@/domains/showings/schema/form";
import {useShowingSubmitMutation} from "@/domains/showings/_feat/crud-hooks";
import {useShowingSubmitForm} from "@/domains/showings/_feat/submit-data";
import {Form} from "@/common/components/ui/form.tsx";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/features/submit-data";
import {BaseMultiStepFormContextProvider} from "@/common/components/forms/multi-step-form";

/** Props for the ShowingSubmitForm component when editing or creating. */
type ShowingEditingProps =
    | { showing: Showing; theatreTimezone: IANATimezone }
    | { showing?: never; theatreTimezone?: never };

/** Props for the ShowingSubmitForm component. */
type SubmitContainerProps = ShowingEditingProps & {
    presetValues?: Partial<ShowingDetails>;
    onSubmitConfig?: MutationResponseConfig<ShowingDetails, ShowingFormData>;
    resetForm?: MutationFormResetConfig;
    children: ReactNode;
};

/** Multi-step form container that manages showing submission logic and state persistence. */
export function ShowingSubmitForm(
    {children, showing, theatreTimezone, onSubmitConfig, resetForm, presetValues}: SubmitContainerProps
): ReactElement {
    const id = useId();
    const formID = `showing-submit-form-${id}`;
    const localStorageKey = "showing-submit-form-data";

    const formProps = showing ? {showing, theatreTimezone} : {};
    const form = useShowingSubmitForm({presetValues, ...formProps});

    const resetOnSuccess = (data: ShowingDetails) => {
        localStorage.removeItem(localStorageKey);
        onSubmitConfig?.onSubmitSuccess?.(data);
    };

    const mutation = useShowingSubmitMutation({
        form,
        resetForm,
        ...onSubmitConfig,
        onSubmitSuccess: resetOnSuccess,
    });

    const onFormSubmit = (values: ShowingFormData) => {
        buildFormSubmitLog({
            values,
            msg: "Showing Submit",
            component: ShowingSubmitForm.name,
        });

        mutation.mutate(values);
    };

    return (
        <BaseMultiStepFormContextProvider formID={formID} localStorageKey={localStorageKey}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(onFormSubmit)}>
                    {children}
                </form>
            </Form>
        </BaseMultiStepFormContextProvider>
    );
}
