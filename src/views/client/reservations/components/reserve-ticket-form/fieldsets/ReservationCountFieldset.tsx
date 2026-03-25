/**
 * @file Fieldset for final ticket quantity verification and submission.
 * @filename TicketSelectorCountFieldset.tsx
 */

import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {UseFormReturn} from "react-hook-form";
import {ReserveTicketFormValues} from "@/domains/reservation/schema/forms/ReserveTicketFormValuesSchema.ts";
import {ReservationType} from "@/domains/reservation/schema/model/fields/ReservationTypeEnumSchema.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for {@link ReservationCountFieldset}.
 */
type FieldsetProps = {
    /** Used to toggle visibility of navigation buttons and input editability. */
    reservationType: ReservationType;

    /** Access to the form's control for the `ticketCount` input. */
    form: UseFormReturn<ReserveTicketFormValues>;

    /** Triggers the transition back to the seat map step. */
    backToSeats: () => void;

    /** The current number of tickets to display or validate against. */
    ticketCount: number;
};

/**
 * Renders the quantity input and the final action buttons for a reservation.
 */
export const ReservationCountFieldset = (
    {reservationType, ticketCount, backToSeats, form}: FieldsetProps
) => {
    return (
        <fieldset className="space-y-4">
            <HookFormInput
                name="ticketCount"
                label="Tickets"
                control={form.control}
                type="number"
                min={0}
                /** Prevent manual overrides in reserved seating mode. */
                disabled={reservationType === "RESERVED_SEATS"}
            />

            <section
                className={cn(
                    "flex items-center",
                    reservationType === "RESERVED_SEATS" ? "justify-between" : "justify-end"
                )}
            >
                {reservationType === "RESERVED_SEATS" && (
                    <Button type="button" onClick={backToSeats}>
                        Back
                    </Button>
                )}

                <Button
                    variant="primary"
                    type="submit"
                    disabled={ticketCount <= 0}
                >
                    Reserve
                </Button>
            </section>
        </fieldset>
    );
};