/**
 * @fileoverview Fieldset for final ticket quantity verification and reservation submission.
 *
 */
import {HookFormInput} from "@/views/common/_feat";
import {Button} from "@/views/common/_comp/ui/button.tsx";
import {useFormContext} from "react-hook-form";
import {ReservationType} from "@/domains/reservations/_schema/model/fields/ReservationTypeEnumSchema.ts";
import {cn} from "@/common/_feat";
import {ReactElement} from "react";

/** Props for the ReservationCountFieldset component. */
type FieldsetProps = {
    reservationType: ReservationType;
    backToSeats: () => void;
};

/**
 * Renders the quantity input and the final action buttons for a reservation.
 * Requires wrapping in a React Hook Form provider.
 */
export function ReservationCountFieldset(
    {reservationType, backToSeats}: FieldsetProps
): ReactElement {
    const {control, watch} = useFormContext();
    const ticketCount = watch("ticketCount");

    return (
        <fieldset className="space-y-4">
            <HookFormInput
                name="ticketCount"
                label="Tickets"
                control={control}
                type="number"
                min={0}
                disabled={reservationType === "RESERVED_SEATS"}
            />

            <section className={cn(
                "flex items-center",
                reservationType === "RESERVED_SEATS" ? "justify-between" : "justify-end"
            )}>
                {
                    reservationType === "RESERVED_SEATS" && (
                        <Button type="button" onClick={backToSeats}>
                            Back
                        </Button>
                    )
                }

                <Button variant="primary" type="submit" disabled={ticketCount <= 0}>
                    Reserve
                </Button>
            </section>
        </fieldset>
    );
}