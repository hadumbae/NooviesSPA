/**
 * @file ReservationSeatingLoader.tsx
 * Loads seating data for a showing into a reservation-scoped seating view.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import SeatMapDetailsLoader from "@/features/admin/seatmaps/loaders/SeatMapDetailsLoader.tsx";
import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import ReservationSeatingView
    from "@/features/client/reservations/components/seating-display/ReservationSeatingView.tsx";

/**
 * Props for the loader.
 */
type LoaderProps = {
    selectedSeating: ObjectId[];
    showingID: ObjectId;
};

/**
 * Binds loaded seating data to a reservation-specific seating display.
 */
const ReservationSeatingLoader = (
    {selectedSeating, showingID}: LoaderProps
) => {
    return (
        <SeatMapDetailsLoader showingID={showingID}>
            {(seating: SeatMapDetails[]) => (
                <ReservationSeatingView
                    selectedSeating={selectedSeating}
                    seating={seating}
                />
            )}
        </SeatMapDetailsLoader>
    );
};

export default ReservationSeatingLoader;
