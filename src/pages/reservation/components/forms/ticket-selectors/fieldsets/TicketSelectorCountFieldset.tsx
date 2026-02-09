/**
 * @file TicketSelectorCountFieldset.tsx
 *
 * Ticket count selection fieldset for the reservation flow.
 *
 * Handles:
 * - Ticket quantity input (hook-form controlled)
 * - Conditional behavior for reserved seating vs general admission
 * - Navigation back to seat selection when applicable
 * - Submit action gating based on ticket count
 */

import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {UseFormReturn} from "react-hook-form";
import {ReserveTicketFormValues} from "@/pages/reservation/schema/forms/ReserveTicketFormValuesSchema.ts";
import {ReservationType} from "@/pages/reservation/schema/enum/ReservationTypeEnumSchema.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for {@link TicketSelectorCountFieldset}.
 */
type FieldsetProps = {
    /** Active reservation type (general admission vs reserved seating) */
    reservationType: ReservationType;

    /** React Hook Form instance for the reservation form */
    form: UseFormReturn<ReserveTicketFormValues>;

    /** Callback to return the user to seat selection */
    backToSeats: () => void;

    /** Current ticket count value */
    ticketCount: number;
};

/**
 * Renders ticket quantity controls and primary reservation actions.
 *
 * @remarks
 * - Disables manual ticket count editing when seats are reserved individually
 * - Shows a "Back" button only for reserved seating flows
 * - Prevents submission when ticket count is zero or less
 */
const TicketSelectorCountFieldset = (
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
                disabled={reservationType === "RESERVED_SEATS"}
            />

            <section
                className={cn(
                    "flex items-center",
                    reservationType === "RESERVED_SEATS" ? "justify-between" : "justify-end"
                )}
            >
                {reservationType === "RESERVED_SEATS" && (
                    <Button onClick={() => backToSeats()}>
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

export default TicketSelectorCountFieldset;
