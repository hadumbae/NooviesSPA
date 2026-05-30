/**
 * @fileoverview Logical container for administrative reservation cancellation logic.
 */

import {UpdateReservationNotesFormSubmit} from "@/domains/reservation/_feat/update-reservations/schemas";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {ReactElement, ReactNode} from "react";
import {
    useCancelReservationMutation,
    useUpdateReservationNotesForm
} from "@/domains/reservation/_feat/update-reservations/hooks";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {UpdateReservationNotesFormContextProvider} from "@/domains/reservation/_feat/update-reservations/contexts";

/** Props for the AdminReservationCancelForm component. */
type FormProps = MutationOnSubmitParams<AdminReservation> & {
    children: ReactNode;
    reservationID: ObjectId;
    className?: string;
    uniqueKey?: string;
    presetValues: Partial<UpdateReservationNotesFormSubmit>;
};

/**
 * Headless form controller that manages the state and submission of a reservation cancellation request.
 */
export function AdminReservationCancelForm(
    {children, reservationID, uniqueKey, presetValues, className, ...onSubmit}: FormProps
): ReactElement {
    const formKey = `res-cancel-reservation-${uniqueKey ?? "form"}`;
    const form = useUpdateReservationNotesForm({presetValues});

    const {mutate} = useCancelReservationMutation({reservationID, form, onSubmitConfig: onSubmit});

    const cancelReservation = (values: UpdateReservationNotesFormSubmit) => {
        mutate(values);
    }

    return (
        <UpdateReservationNotesFormContextProvider formID={formKey}>
            <Form {...form}>
                <form
                    id={formKey}
                    onSubmit={form.handleSubmit(cancelReservation)}
                    className={className}
                >
                    {children}
                </form>
            </Form>
        </UpdateReservationNotesFormContextProvider>
    );
}