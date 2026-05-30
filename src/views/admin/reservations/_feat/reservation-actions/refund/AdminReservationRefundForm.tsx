/**
 * @fileoverview Logical container for the administrative reservation refund process.
 */

import {ReactElement, ReactNode} from "react";
import {Form} from "@/common/components/ui/form.tsx";
import {useRefundReservationMutation, useUpdateReservationNotesForm} from "@/domains/reservation/_feat/update-reservations/hooks";
import {UpdateReservationNotesFormSubmit} from "@/domains/reservation/_feat/update-reservations/schemas";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {UpdateReservationNotesFormContextProvider} from "@/domains/reservation/_feat/update-reservations/contexts";

/** Props for the AdminReservationRefundForm component. */
type FormProps = MutationOnSubmitParams<AdminReservation> & {
    children: ReactNode;
    reservationID: ObjectId;
    uniqueKey?: string;
    presetValues?: Partial<UpdateReservationNotesFormSubmit>;
};

/** Controller component that manages the state and logic for refunding a reservation. */
export function AdminReservationRefundForm(
    {children, reservationID, uniqueKey, presetValues, ...onSubmit}: FormProps
): ReactElement {
    const formKey = `res-status-refund-${uniqueKey ?? "form"}`;
    const form = useUpdateReservationNotesForm({presetValues});

    const {mutate} = useRefundReservationMutation({form, reservationID, onSubmitConfig: onSubmit});

    const refundReservation = (values: UpdateReservationNotesFormSubmit) => {
        mutate(values);
    };

    return (
        <UpdateReservationNotesFormContextProvider formID={formKey}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(refundReservation)}>
                    {children}
                </form>
            </Form>
        </UpdateReservationNotesFormContextProvider>
    );
}