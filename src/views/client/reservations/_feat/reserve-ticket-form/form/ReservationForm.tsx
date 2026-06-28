/**
 * @fileoverview Orchestration container for the ticket reservation form.
 *
 */

import {useReserveTicketForm} from "@/domains/reservation/_feat/reserve-tickets/forms/useReserveTicketForm.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    ReserveTicketFormData,
    ReserveTicketFormValues
} from "@/domains/reservation/_feat/reserve-tickets/schema/ReserveTicketFormSchema.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {ISO4217CurrencyCode} from "@/common/schema/enums/ISO4217CurrencyCodeEnumSchema.ts";

import {PopulatedReservation, ReservationType} from "@/domains/reservation/_schema/model";
import {useReserveTicketSubmitMutation} from "@/domains/reservation/_feat/reserve-tickets";
import {ReactElement, ReactNode, useId} from "react";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {Form} from "@/common/components/ui/form.tsx";

/** Props for the ReservationForm component. */
type ContainerProps = {
    children: ReactNode;
    showingID: ObjectId;
    reservationType: ReservationType;
    currency?: ISO4217CurrencyCode;
    onSubmitConfig?: MutationResponseConfig<PopulatedReservation, ReserveTicketFormData>;
};

/**
 * Container component that abstracts the business logic for booking tickets.
 * Requires a showing ID and reservation type to initialize the form state.
 */
export function ReservationForm(
    {children, showingID, reservationType, currency = "USD", onSubmitConfig}: ContainerProps
): ReactElement {
    const id = useId();
    const formID = `reserve-ticket-form-${id}`;

    const presetValues: Partial<ReserveTicketFormValues> = {
        currency,
        reservationType,
        showing: showingID,
        selectedSeating: reservationType === "RESERVED_SEATS" ? [] : null,
    };

    const form = useReserveTicketForm({presetValues});
    const mutation = useReserveTicketSubmitMutation({form, ...onSubmitConfig});

    const submitData = (values: ReserveTicketFormData) => {
        Logger.log({
            type: "DATA",
            msg: "Initiating ticket reservation submission.",
            context: {values},
        });

        mutation.mutate(values);
    };

    return (
        <BaseFormContextProvider formID={formID}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitData)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}