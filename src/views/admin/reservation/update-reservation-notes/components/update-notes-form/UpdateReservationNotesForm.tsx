/**
 * @file Logical container for updating administrative reservation notes with context integration.
 * @filename UpdateReservationNotesForm.tsx
 */

import {
    useUpdateReservationNotesForm, useUpdateReservationNotesMutation,
} from "@/domains/reservation/features/update-reservations/hooks";
import {
    UpdateReservationNotesFormSubmit,
} from "@/domains/reservation/features/update-reservations/schemas";
import {Form} from "@/common/components/ui/form.tsx";
import {ReactNode} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {
    UpdateReservationNotesFormContextProvider
} from "@/views/admin/reservation/update-reservation-notes/components/providers";

/**
 * Properties for the {@link UpdateReservationNotesForm} component.
 */
type FormProps = MutationOnSubmitParams<AdminReservation> & {
    /** The UI components, inputs, and actions to be rendered within the form. */
    children: ReactNode;

    /** The unique MongoDB ObjectId of the target reservation record. */
    reservationID: ObjectId;

    /**
     * An optional identifier suffix.
     * Ensures HTML `id` uniqueness when multiple note forms exist on a single page.
     */
    uniqueKey?: string;

    /** Initial values used to populate the form fields upon mounting. */
    presetValues?: Partial<UpdateReservationNotesFormSubmit>;
};

/**
 * An administrative form controller that manages the lifecycle of reservation note updates.
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