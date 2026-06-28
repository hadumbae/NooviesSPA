/**
 * @fileoverview Logical container for administrative reservation cancellation logic.
 */

import {ReactElement, ReactNode} from "react";
import {Form} from "@/common/components/ui";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {
    AdminReservation,
    UpdateReservationNotesFormData,
    UpdateReservationNotesFormValues,
    useCancelReservationMutation,
    useUpdateReservationNotesForm,
    useUpdateReservationSubmitHandler,
} from "@/domains/reservation";

/** Props for the AdminReservationCancelForm component. */
type FormProps = MutationResponseConfig<AdminReservation, UpdateReservationNotesFormData> & {
    children: ReactNode;
    reservationID: ObjectId;
    className?: string;
    presetValues: Partial<UpdateReservationNotesFormValues>;
};

/**
 * Headless form controller that manages the state and submission of a reservation cancellation request.
 */
export function AdminReservationCancelForm(
    {children, reservationID, presetValues, className, ...submitConfig}: FormProps
): ReactElement {
    const formID = useGenerateFormID("res-cancel-reservation-form");
    const form = useUpdateReservationNotesForm({presetValues});

    const {mutateAsync, isPending, isError} = useCancelReservationMutation({reservationID});

    const cancelReservation = useUpdateReservationSubmitHandler({
        form,
        submitData: async (data: UpdateReservationNotesFormData) => await mutateAsync(data),
        ...submitConfig,
    });

    return (
        <BaseFormContextProvider
            formID={formID}
            isPending={isPending}
            isError={isError}
            submitHandler={cancelReservation}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(cancelReservation)} className={className}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}