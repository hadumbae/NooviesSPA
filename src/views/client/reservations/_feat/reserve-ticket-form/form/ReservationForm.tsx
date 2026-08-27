/**
 * @fileoverview Form component and custom hook exports for managing ticket reservation submissions.
 */

import {createForm} from "@/common/_feat";
import {PopulatedReservation,} from "@/domains/reservations/_schema/model";
import {useReserveTicketSubmitMutation} from "@/domains/reservations/_feat/reserve-tickets/mutations";
import {
    ReserveTicketFormData,
    ReserveTicketFormSchema,
    ReserveTicketFormValues,
} from "@/domains/reservations/_feat/reserve-tickets/schema";


const {SubmitForm, useSubmitForm} = createForm<
    ReserveTicketFormValues,
    ReserveTicketFormData,
    unknown,
    PopulatedReservation
>({
    formName: "reserve-ticket-form",
    schema: ReserveTicketFormSchema,
    mutation: useReserveTicketSubmitMutation,
    defaultValues: {
        showing: "",
        movie: "",
        ticketCount: 0,
        currency: undefined,
        reservationType: "GENERAL_ADMISSION",
        selectedSeating: [],
    },
});

export {
    /** Form component for submitting ticket reservations. */
        SubmitForm as ReservationForm,
    /** Hook for managing ticket reservation form state and submission logic. */
        useSubmitForm as useReservationForm,
}