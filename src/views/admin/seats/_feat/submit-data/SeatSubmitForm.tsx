/**
 * @fileoverview Orchestrator for seat creation and updates, handling form initialization and mutation logic.
 */

import {ReactElement} from "react";
import {SeatFormData, SeatFormValues} from "@/domains/seats/_feat/submit-data";
import {useSeatSubmitForm} from "@/domains/seats/_feat/submit-data/useSeatSubmitForm.ts";
import {FormConfigProps} from "@/common/_feat/submit-data";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";
import {useSeatSubmitMutation} from "@/domains/seats/_feat/crud-hooks";
import {Seat, SeatDetails} from "@/domains/seats/schema/model";

/** Props for the SeatSubmitForm component. */
type FormProps = FormConfigProps<SeatFormValues, Seat, SeatDetails>;

/**
 * Manages the submission lifecycle for seat data, integrating mutation hooks with a unified form provider.
 */
export function SeatSubmitForm(
    {children, editEntity, presetValues, uniqueKey, ...formOptions}: FormProps
): ReactElement {
    const formKey = `theatre-seat-submit-${editEntity?._id ?? "create"}-${uniqueKey ?? "form"}`;
    console.log("formKey", formKey);

    const form = useSeatSubmitForm({seat: editEntity, presetValues});
    const mutation = useSeatSubmitMutation({form, ...formOptions});

    const submitSeatData = (values: SeatFormData) => {
        mutation.mutate(values);
    };

    return (
        <BaseFormContextProvider formID={formKey} isPending={mutation.isPending}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(submitSeatData)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}