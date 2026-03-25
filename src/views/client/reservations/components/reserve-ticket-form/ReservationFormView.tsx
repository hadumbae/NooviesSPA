/**
 * @file Presentation layer for the Ticket Reservation multi-step flow.
 * @filename ShowingTicketSelectorFormView.tsx
 */

import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {ReserveTicketFormValues} from "@/domains/reservation/schema/forms/ReserveTicketFormValuesSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {ReservationType} from "@/domains/reservation/schema/enum/ReservationTypeEnumSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import {useState} from "react";
import {ReservationCountFieldset}
    from "@/views/client/reservations/components/reserve-ticket-form/fieldsets/ReservationCountFieldset.tsx";
import {ReservationSeatFieldset}
    from "@/views/client/reservations/components/reserve-ticket-form/fieldsets/ReservationSeatFieldset.tsx";

/**
 * Props for the {@link ReservationFormView}.
 */
type FormViewProps = {
    /** The actual logic function that triggers the mutation. */
    submitHandler: SubmitHandler<ReserveTicketFormValues>;

    /** The React Hook Form instance containing values and validation state. */
    form: UseFormReturn<ReserveTicketFormValues>;

    /** Informs the UI whether to show seat-selection steps. */
    reservationType: ReservationType;

    /** Optional CSS class for external layout control. */
    className?: string;
};

/**
 * A stateful view component that manages the user's progression through the booking steps.
 */
export const ReservationFormView = (
    {form, submitHandler, reservationType, className}: FormViewProps
) => {
    const [reserveSeats, setReserveSeats] =
        useState<boolean>(reservationType === "RESERVED_SEATS");

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
};