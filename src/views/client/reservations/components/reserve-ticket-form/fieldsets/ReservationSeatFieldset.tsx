/**
 * @file Interactive fieldset for visual seat selection.
 * @filename TicketSelectorSeatFieldset.tsx
 */

import {UseFormReturn} from "react-hook-form";
import {ReserveTicketFormValues} from "@/domains/reservation/schema/forms/ReserveTicketFormValuesSchema.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import SeatMapDetailsLoader from "@/views/admin/seatmaps/_comp/loaders/SeatMapDetailsLoader.tsx";
import ReservationSeatMapInput from "@/views/client/reservations/components/seating-input/ReservationSeatMapInput.tsx";
import {useEffect} from "react";

/**
 * Props for {@link ReservationSeatFieldset}.
 */
type FieldsetProps = {
    /** The main form controller. */
    form: UseFormReturn<ReserveTicketFormValues>;

    /** Navigates the user to the next step (Count/Confirmation). */
    proceedToCount: () => void;

    /** The count of currently selected seats to control the "Next" button state. */
    ticketCount: number;
};

/**
 * Renders a visual seat map and synchronizes selection with the form state.
 */
export const ReservationSeatFieldset = ({form, ticketCount, proceedToCount}: FieldsetProps) => {
    const showingID = form.watch("showing") as ObjectId;
    const selectedSeating = (form.watch("selectedSeating") || []) as ObjectId[];

    /** Keep the ticket count in sync with the visual map selection. */
    useEffect(() => {
        form.setValue("ticketCount", selectedSeating.length, { shouldValidate: true });
    }, [selectedSeating, form]);

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
                    type="button"
                    variant="outline"
                    disabled={ticketCount === 0}
                    onClick={proceedToCount}
                >
                    Next
                </Button>
            </div>
        </fieldset>
    );
};