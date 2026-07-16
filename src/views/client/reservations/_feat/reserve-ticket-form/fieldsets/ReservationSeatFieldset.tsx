/**
 * @fileoverview Interactive fieldset for visual seat selection within the reservation flow.
 */

import {Button} from "@/common/components/ui/button.tsx";
import {ObjectId} from "@/common/_schemas";
import {
    SeatMapDetailsLoader
} from "@/views/admin/seatmaps/_comp/loaders/SeatMapDetailsLoader.tsx";
import {ReservationSeatMapInput} from "@/views/client/reservations/_comp/seating-input/ReservationSeatMapInput.tsx";
import {ReactElement, useEffect} from "react";
import {useFormContext} from "react-hook-form";

/** Props for the ReservationSeatFieldset component. */
export type FieldsetProps = {
    proceedToCount: () => void;
};

/**
 * Renders a visual seat map and synchronises selection with the reservation form state.
 */
export function ReservationSeatFieldset(
    {proceedToCount}: FieldsetProps
): ReactElement {
    const {control, watch, setValue} = useFormContext();

    const showingID = watch("showing") as ObjectId;
    const selectedSeating = (watch("selectedSeating") || []) as ObjectId[];

    useEffect(() => {
        setValue("ticketCount", selectedSeating.length, {shouldValidate: true});
    }, [selectedSeating, setValue]);

    const ticketCount = watch("ticketCount");

    return (
        <fieldset className="space-y-4">
            <SeatMapDetailsLoader showingID={showingID} status="AVAILABLE">
                {(seating) => (
                    <ReservationSeatMapInput
                        name="selectedSeating"
                        control={control}
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