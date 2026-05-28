/**
 * @file Orchestration container for the Ticket Reservation form.
 * @filename ShowingTicketSelectorFormContainer.tsx
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {useReserveTicketForm} from "@/domains/reservation/_feat/reserve-tickets/forms/useReserveTicketForm.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    ReserveTicketFormData,
    ReserveTicketFormValues
} from "@/domains/reservation/_feat/reserve-tickets/schema/ReserveTicketFormSchema.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {ISO4217CurrencyCode} from "@/common/schema/enums/ISO4217CurrencyCodeEnumSchema.ts";
import {
    ReservationFormView
} from "@/views/client/reservations/_feat/reserve-ticket-form/form/ReservationFormView.tsx";

import {PopulatedReservation, ReservationType} from "@/domains/reservation/schema/model";
import {useReserveTicketSubmitMutation} from "@/domains/reservation/_feat/reserve-tickets";
import {ReactElement} from "react";

/**
 * Props for {@link ReservationForm}.
 */
type ContainerProps = MutationOnSubmitParams<PopulatedReservation> & {
    showingID: ObjectId;
    reservationType: ReservationType;
    currency?: ISO4217CurrencyCode;
};

/**
 * A container component that abstracts the business logic for booking tickets.
 */
export function ReservationForm(
    {showingID, reservationType, currency = "USD", ...mutationProps}: ContainerProps
): ReactElement {
    const presetValues: Partial<ReserveTicketFormValues> = {
        currency,
        reservationType,
        showing: showingID,
        selectedSeating: reservationType === "RESERVED_SEATS" ? [] : null,
    };

    const form = useReserveTicketForm({presetValues});
    const mutation = useReserveTicketSubmitMutation({
        form,
        ...mutationProps,
    });

    const submitData = (values: ReserveTicketFormValues) => {
        Logger.log({
            type: "DATA",
            msg: "Initiating ticket reservation submission.",
            context: {values},
        });

        mutation.mutate(values as ReserveTicketFormData);
    };

    return (
        <ReservationFormView
            reservationType={reservationType}
            submitHandler={submitData}
            form={form}
        />
    );
}