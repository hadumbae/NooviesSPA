/**
 * @fileoverview Presentation layer for the multi-step ticket reservation flow.
 */

import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {Form} from "@/common/components/ui/form.tsx";
import {ReservationType} from "@/domains/reservation/schema/model/fields/ReservationTypeEnumSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import {ReactElement, useState} from "react";
import {
    ReservationCountFieldset
} from "@/views/client/reservations/_feat/reserve-ticket-form/fieldsets/ReservationCountFieldset.tsx";
import {
    ReservationSeatFieldset
} from "@/views/client/reservations/_feat/reserve-ticket-form/fieldsets/ReservationSeatFieldset.tsx";
import {
    ReserveTicketFormData,
    ReserveTicketFormValues
} from "@/domains/reservation/_feat/reserve-tickets/schema/ReserveTicketFormSchema.ts";

/**
 * Props for the ReservationFormView component.
 */
type FormViewProps = {
    submitHandler: SubmitHandler<ReserveTicketFormValues>;
    form: UseFormReturn<ReserveTicketFormValues, unknown, ReserveTicketFormData>;
    reservationType: ReservationType;
    className?: string;
};

/**
 * Stateful view component that manages the user progression through the booking steps.
 */
export function ReservationFormView(
    {form, submitHandler, reservationType, className}: FormViewProps
): ReactElement {
    const [reserveSeats, setReserveSeats] = useState<boolean>(reservationType === "RESERVED_SEATS");

    const proceedToCount = () => setReserveSeats(false);
    const backToSeats = () => setReserveSeats(true);

    const ticketCountValue = form.watch("ticketCount");
    const ticketCount = ticketCountValue ? Number(ticketCountValue) : 0;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-4", className)}
            >
                {reserveSeats ? (
                    <ReservationSeatFieldset
                        form={form}
                        proceedToCount={proceedToCount}
                        ticketCount={ticketCount}
                    />
                ) : (
                    <ReservationCountFieldset
                        form={form}
                        backToSeats={backToSeats}
                        reservationType={reservationType}
                        ticketCount={ticketCount}
                    />
                )}
            </form>
        </Form>
    );
}