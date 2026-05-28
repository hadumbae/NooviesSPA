/**
 * @fileoverview Logical container for updating administrative reservation notes with context integration.
 */

import {
    useUpdateReservationNotesForm, useUpdateReservationNotesMutation,
} from "@/domains/reservation/_feat/update-reservations/hooks";
import {
    UpdateReservationNotesFormSubmit,
} from "@/domains/reservation/_feat/update-reservations/schemas";
import {Form} from "@/common/components/ui/form.tsx";
import {ReactNode} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {UpdateReservationNotesFormContextProvider} from "@/domains/reservation/_feat/update-reservations/contexts";

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
export const UpdateReservationNotesForm = (
    {children, reservationID, uniqueKey, presetValues, ...onSubmitProps}: FormProps
) => {
    const formKey = `update-reservation-admin-notes-${uniqueKey ?? "form"}`;
    const form = useUpdateReservationNotesForm({presetValues});

    const mutation = useUpdateReservationNotesMutation({
        form,
        reservationID,
        onSubmit: onSubmitProps,
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
};