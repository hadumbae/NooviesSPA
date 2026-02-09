/**
 * @file TicketSelectorSeatFieldset.tsx
 *
 * Seat-selection step of the ticket reservation flow.
 *
 * Responsibilities:
 * - Load seat map data for the selected showing
 * - Allow users to select seats
 * - Keep `ticketCount` in sync with selected seats
 * - Gate progression until at least one seat is selected
 *
 * @remarks
 * This fieldset assumes seat-based ticketing.
 * `ticketCount` is derived from `selectedSeating` and should not be edited directly.
 */

import {UseFormReturn} from "react-hook-form";
import {ReserveTicketFormValues} from "@/pages/reservation/schema/forms/ReserveTicketFormValuesSchema.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import SeatMapDetailsLoader from "@/features/admin/seatmaps/loaders/SeatMapDetailsLoader.tsx";
import ReservationSeatMapInput from "@/features/client/reservations/components/seating/ReservationSeatMapInput.tsx";
import {useEffect} from "react";

/**
 * Props for {@link TicketSelectorSeatFieldset}.
 */
type FieldsetProps = {
    /** React Hook Form instance for the reservation form */
    form: UseFormReturn<ReserveTicketFormValues>;

    /** Advances the reservation flow to the ticket count / next step */
    proceedToCount: () => void;

    /** Current number of selected tickets */
    ticketCount: number;
};

/**
 * Renders the seat-selection UI within the reservation flow.
 *
 * @param form - React Hook Form controller
 * @param ticketCount - Derived count of selected seats
 * @param proceedToCount - Callback to advance the flow
 */
const TicketSelectorSeatFieldset = ({form, ticketCount, proceedToCount}: FieldsetProps) => {
    const showingID = form.watch("showing") as ObjectId;
    const selectedSeating = (form.watch("selectedSeating") || []) as ObjectId[];

    useEffect(() => {
        form.setValue("ticketCount", selectedSeating.length);
    }, [selectedSeating]);

    return (
        <fieldset className="space-y-4">
            <SeatMapDetailsLoader showingID={showingID} status="AVAILABLE">
                {(seating) => (
                    <ReservationSeatMapInput
                        name="selectedSeating"
                        control={form.control}
                        seating={seating}
                    />
                )}
            </SeatMapDetailsLoader>

            <div className="text-right">
                <Button
                    variant="outline"
                    disabled={ticketCount === 0}
                    onClick={() => proceedToCount()}
                >
                    Next
                </Button>
            </div>
        </fieldset>
    );
};

export default TicketSelectorSeatFieldset;
