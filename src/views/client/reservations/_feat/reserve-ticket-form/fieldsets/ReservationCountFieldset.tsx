/**
 * @fileoverview Fieldset for final ticket quantity verification and submission.
 */
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {UseFormReturn} from "react-hook-form";
import {ReservationType} from "@/domains/reservation/schema/model/fields/ReservationTypeEnumSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import {
    ReserveTicketFormData,
    ReserveTicketFormValues
} from "@/domains/reservation/_feat/reserve-tickets/schema/ReserveTicketFormSchema.ts";
import {ReactElement} from "react";

/** Props for the ReservationCountFieldset component. */
type FieldsetProps = {
    reservationType: ReservationType;
    form: UseFormReturn<ReserveTicketFormValues, unknown, ReserveTicketFormData>;
    backToSeats: () => void;
    ticketCount: number;
};

/** Renders the quantity input and the final action buttons for a reservation. */
export function ReservationCountFieldset(
    {reservationType, ticketCount, backToSeats, form}: FieldsetProps
): ReactElement {
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
}