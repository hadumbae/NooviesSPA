/**
 * @fileoverview Logical container for the administrative reservation refund process.
 */

import {ReactElement, ReactNode} from "react";
import {Form} from "@/common/components/ui";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";

import {
    AdminReservation,
    UpdateReservationNotesFormData,
    useRefundReservationMutation,
    useUpdateReservationNotesForm,
    useUpdateReservationSubmitHandler
} from "@/domains/reservations";

/** Props for the AdminReservationRefundForm component. */
type FormProps = MutationResponseConfig<AdminReservation, UpdateReservationNotesFormData> & MutationFormResetConfig & {
    children: ReactNode;
    reservationID: ObjectId;
    presetValues?: Partial<UpdateReservationNotesFormData>;
};

/** Controller component that manages the state and logic for refunding a reservation. */
export function AdminReservationRefundForm(
    {children, reservationID, presetValues, ...submitConfig}: FormProps
): ReactElement {
    const formID = useGenerateFormID("res-status-refund-form");
    const form = useUpdateReservationNotesForm({presetValues});

    const {mutateAsync, isPending, isError} = useRefundReservationMutation({reservationID});

    const refundReservation = useUpdateReservationSubmitHandler({
        form,
        submitData: (data: UpdateReservationNotesFormData) => mutateAsync(data),
        ...submitConfig,
    });

    return (
        <BaseFormContextProvider
            formID={formID}
            isPending={isPending}
            isError={isError}
            submitHandler={refundReservation}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(refundReservation)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}