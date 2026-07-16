/**
 * @fileoverview Logical container for updating administrative reservation notes with context integration.
 */

import {ReactElement, ReactNode} from "react";
import {Form} from "@/common/components/ui/form.tsx";
import {ObjectId} from "@/common/_schemas";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";

import {
    AdminReservation,
    UpdateReservationNotesFormData,
    useUpdateReservationNotesForm,
    useUpdateReservationNotesMutation,
    useUpdateReservationSubmitHandler
} from "@/domains/reservations";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";

/** Props for the UpdateReservationNotesForm component. */
type FormProps = MutationResponseConfig<AdminReservation, UpdateReservationNotesFormData> & MutationFormResetConfig & {
    children: ReactNode;
    reservationID: ObjectId;
    presetValues?: Partial<UpdateReservationNotesFormData>;
};

/**
 * Administrative form controller that manages the lifecycle of reservation note updates.
 */
export function UpdateReservationNotesForm(
    {children, reservationID, presetValues, ...submitConfig}: FormProps
): ReactElement {
    const formID = useGenerateFormID("update-reservation-admin-notes-form");
    const form = useUpdateReservationNotesForm({presetValues});

    const {mutateAsync, isPending, isError} = useUpdateReservationNotesMutation({reservationID});

    const updateNotes = useUpdateReservationSubmitHandler({
        form,
        submitData: (data: UpdateReservationNotesFormData) => mutateAsync(data),
        ...submitConfig,
    });

    return (
        <BaseFormContextProvider
            formID={formID}
            isPending={isPending}
            isError={isError}
            submitHandler={updateNotes}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(updateNotes)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}