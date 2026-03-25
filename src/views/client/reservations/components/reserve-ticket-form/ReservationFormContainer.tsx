/**
 * @file Orchestration container for the Ticket Reservation form.
 * @filename ShowingTicketSelectorFormContainer.tsx
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {ReserveTicketFormValues} from "@/domains/reservation/schema/forms/ReserveTicketFormValuesSchema.ts";
import {useReserveTicketForm} from "@/domains/reservation/forms/useReserveTicketForm.ts";
import {useReserveTicketSubmitMutation} from "@/domains/reservation/mutations/useReserveTicketSubmitMutation.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ReserveTicketForm} from "@/domains/reservation/schema/forms/ReserveTicketFormSchema.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {ISO4217CurrencyCode} from "@/common/schema/enums/ISO4217CurrencyCodeEnumSchema.ts";
import {ReservationFormView} from "@/views/client/reservations/components/reserve-ticket-form/ReservationFormView.tsx";

import {PopulatedReservation, ReservationType} from "@/domains/reservation/schema/model";

/**
 * Props for {@link ReservationFormContainer}.
 */
type ContainerProps = MutationOnSubmitParams<PopulatedReservation> & {
    /** The target `Showing` ID used to anchor the reservation and fetch relevant seat maps. */
    showingID: ObjectId;

    /** Determines the logic flow: either "GENERAL_ADMISSION" or "RESERVED_SEATS". */
    reservationType: ReservationType;

    /** The currency context for pricing calculations. Defaults to "USD". */
    currency?: ISO4217CurrencyCode;
};

/**
 * A container component that abstracts the business logic for booking tickets.
 */
export const ReservationFormContainer = (
    {showingID, reservationType, currency = "USD", ...mutationProps}: ContainerProps
) => {
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

        mutation.mutate(values as ReserveTicketForm);
    };

    return (
        <ReservationFormView
            reservationType={reservationType}
            submitHandler={submitData}
            form={form}
        />
    );
};