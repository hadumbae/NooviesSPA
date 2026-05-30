/**
 * @fileoverview Logical container for updating administrative reservation notes with context integration.
 */

import {
    UpdateReservationNotesFormSubmit,
    useUpdateReservationNotesForm,
    useUpdateReservationNotesMutation,
} from "src/domains/reservation/_feat/update-reservations/hooks";
import {Form} from "src/common/components/ui/form.tsx";
import {ReactElement, ReactNode} from "react";
import {ObjectId} from "src/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "src/common/type/form/MutationSubmitParams.ts";
import {AdminReservation} from "src/domains/reservation/schema/model";
import {UpdateReservationNotesFormContextProvider} from "src/domains/reservation/_feat/update-reservations/contexts";

/** Props for the UpdateReservationNotesForm component. */
type FormProps = MutationOnSubmitParams<AdminReservation> & {
    children: ReactNode;
    reservationID: ObjectId;
    uniqueKey?: string;
    presetValues?: Partial<UpdateReservationNotesFormSubmit>;
};

/**
 * Administrative form controller that manages the lifecycle of reservation note updates.
 */
export function UpdateReservationNotesForm(
    {children, reservationID, uniqueKey, presetValues, ...onSubmitProps}: FormProps
): ReactElement {
    const formKey = `update-reservation-admin-notes-${uniqueKey ?? "form"}`;
    const form = useUpdateReservationNotesForm({presetValues});

    const mutation = useUpdateReservationNotesMutation({
        form,
        reservationID,
        onSubmitConfig: onSubmitProps,
    });

    const updateNotes = (values: UpdateReservationNotesFormSubmit) => {
        mutation.mutate(values);
    }

    return (
        <UpdateReservationNotesFormContextProvider formID={formKey}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(updateNotes)}>
                    {children}
                </form>
            </Form>
        </UpdateReservationNotesFormContextProvider>
    );
}