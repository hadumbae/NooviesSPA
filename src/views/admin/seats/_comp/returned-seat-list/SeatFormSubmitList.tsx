/**
 * @fileoverview Renders a list of seats recently created or updated, dispatching them to
 * specific card components based on their layout type (Seat vs. Structure).
 */

import {Dispatch, ReactElement, SetStateAction} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {SeatDetails} from "@/domains/seats/schema/seat/SeatDetails.types.ts";
import {SeatFormSubmitSeatCard}
    from "@/views/admin/seats/_comp/returned-seat-list/SeatFormSubmitSeatCard.tsx";
import {SeatFormSubmitStructureCard}
    from "@/views/admin/seats/_comp/returned-seat-list/SeatFormSubmitStructureCard.tsx";

/** Props for the SeatFormSubmitList component. */
type ListProps = {
    returnedSeating: SeatDetails[];
    setReturnedSeating: Dispatch<SetStateAction<SeatDetails[]>>;
};

/**
 * Iterates through a collection of seat details and renders the appropriate UI card.
 */
export function SeatFormSubmitList(
    {returnedSeating, setReturnedSeating}: ListProps
): ReactElement {

    /** Removes a seat from the local list state. */
    const removeSeat = (_id: ObjectId) => {
        setReturnedSeating(prev => prev.filter(s => s._id !== _id));
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            {returnedSeating.map((seat: SeatDetails) => {
                const {layoutType, _id} = seat;

                if (layoutType === "SEAT") {
                    return (
                        <SeatFormSubmitSeatCard
                            key={_id}
                            seat={seat}
                            removeSeat={removeSeat}
                        />
                    );
                }

                return (
                    <SeatFormSubmitStructureCard
                        key={_id}
                        seat={seat}
                        removeSeat={removeSeat}
                    />
                );
            })}
        </div>
    );
}