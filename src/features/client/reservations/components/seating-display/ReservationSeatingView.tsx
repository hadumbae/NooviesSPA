/**
 * @file ReservationSeatingView.tsx
 * Renders reservation seating arranged into display rows.
 */

import useOrganisedSeatingForLayout
    from "@/pages/seats/hooks/features/admin/screen-seat-layout/useOrganisedSeatingForLayout.ts";
import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import ReservationSeatingElement
    from "@/features/client/reservations/components/seating-display/ReservationSeatingElement.tsx";

/**
 * Props for the ReservationSeatingView component.
 */
type DisplayProps = {
    selectedSeating: ObjectId[];
    seating: SeatMapDetails[];
    className?: string;
}

/**
 * Displays seating elements grouped by layout row.
 */
const ReservationSeatingView = (
    {selectedSeating, seating, className}: DisplayProps
) => {
    const {seatRowEntries} = useOrganisedSeatingForLayout({
        seating,
        includeLabels: false,
    });

    const isSelected = (_id?: ObjectId | null) => _id
        ? selectedSeating.includes(_id)
        : false;

    return (
        <div className={cn("space-y-2", className)}>
            {seatRowEntries.map(([y, rowSeats]) => (
                <div key={`row-${y}`} className="flex justify-center items-center gap-3">
                    {(rowSeats as (SeatMapDetails | null)[]).map((element, index) => {
                        const key = element ? `${element._id}-${index}` : `null-${index}`;
                        const isElementSelected = isSelected(element && element._id);

                        return (
                            <ReservationSeatingElement
                                key={key}
                                element={element}
                                isSelected={isElementSelected}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default ReservationSeatingView;
