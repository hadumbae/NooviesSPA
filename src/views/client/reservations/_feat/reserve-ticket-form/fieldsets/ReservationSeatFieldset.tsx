/**
 * @fileoverview Interactive fieldset for visual seat selection within the reservation flow.
 */

import {UseFormReturn} from "react-hook-form";
import {Button} from "@/common/components/ui/button.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import SeatMapDetailsLoader from "@/views/admin/seatmaps/_comp/loaders/SeatMapDetailsLoader.tsx";
import ReservationSeatMapInput from "@/views/client/reservations/components/seating-input/ReservationSeatMapInput.tsx";
import {ReactElement, useEffect} from "react";
import {
    ReserveTicketFormData,
    ReserveTicketFormValues
} from "@/domains/reservation/_feat/reserve-tickets/schema/ReserveTicketFormSchema.ts";

/** Props for the ReservationSeatFieldset component. */
export type FieldsetProps = {
    form: UseFormReturn<ReserveTicketFormValues, unknown, ReserveTicketFormData>;
    proceedToCount: () => void;
    ticketCount: number;
};

/**
 * Renders a visual seat map and synchronizes selection with the reservation form state.
 */
export function ReservationSeatFieldset(
    {form, ticketCount, proceedToCount}: FieldsetProps
): ReactElement {
    const showingID = form.watch("showing") as ObjectId;
    const selectedSeating = (form.watch("selectedSeating") || []) as ObjectId[];

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
}