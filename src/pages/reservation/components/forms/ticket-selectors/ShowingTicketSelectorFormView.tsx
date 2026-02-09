/**
 * @file ShowingTicketSelectorFormView.tsx
 *
 * Presentation component for the ticket selection form.
 *
 * Handles:
 * - Conditional rendering between seat selection and ticket count
 * - Local UI flow state for reserved seating
 * - Form submission wiring via React Hook Form
 *
 * All business logic and mutations are delegated to the container.
 */

import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {ReserveTicketFormValues} from "@/pages/reservation/schema/forms/ReserveTicketFormValuesSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {ReservationType} from "@/pages/reservation/schema/enum/ReservationTypeEnumSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import {useState} from "react";
import TicketSelectorCountFieldset
    from "@/pages/reservation/components/forms/ticket-selectors/fieldsets/TicketSelectorCountFieldset.tsx";
import TicketSelectorSeatFieldset
    from "@/pages/reservation/components/forms/ticket-selectors/fieldsets/TicketSelectorSeatFieldset.tsx";

/**
 * Props for {@link ShowingTicketSelectorFormView}.
 */
type FormViewProps = {
    /** Form submission handler */
    submitHandler: SubmitHandler<ReserveTicketFormValues>;

    /** React Hook Form instance */
    form: UseFormReturn<ReserveTicketFormValues>;

    /** Reservation flow type */
    reservationType: ReservationType;

    /** Optional wrapper class name */
    className?: string;
};

/**
 * View component for selecting tickets for a showing.
 *
 * @remarks
 * - Manages only local UI flow state (`reserveSeats`)
 * - Switches between seat selection and ticket count fieldsets
 * - Relies on the container for all business logic
 *
 * @param props - Form state and configuration
 */
const ShowingTicketSelectorFormView = (
    {form, submitHandler, reservationType, className}: FormViewProps
) => {
    const [reserveSeats, setReserveSeats] =
        useState<boolean>(reservationType === "RESERVED_SEATS");

    /** Advances from seat selection to ticket count */
    const proceedToCount = () => setReserveSeats(false);

    /** Returns from ticket count to seat selection */
    const backToSeats = () => setReserveSeats(true);

    /** Derived numeric ticket count */
    const ticketCountValue = form.watch("ticketCount");
    const ticketCount = ticketCountValue
        ? Number(ticketCountValue)
        : 0;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-4", className)}
            >
                {reserveSeats ? (
                    <TicketSelectorSeatFieldset
                        form={form}
                        proceedToCount={proceedToCount}
                        ticketCount={ticketCount}
                    />
                ) : (
                    <TicketSelectorCountFieldset
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

export default ShowingTicketSelectorFormView;
