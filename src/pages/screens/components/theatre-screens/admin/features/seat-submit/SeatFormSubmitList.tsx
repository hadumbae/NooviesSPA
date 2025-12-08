/**
 * @file SeatFormSubmitList.tsx
 *
 * ⚡ SeatFormSubmitList
 *
 * Renders all seats stored in {@link SeatFormContext.returnedSeats} as individual
 * cards. Automatically dispatches each seat to either {@link SeatFormSubmitSeatCard}
 * (for `"SEAT"` layout types) or {@link SeatFormSubmitStructureCard}
 * (for non-seat structural types).
 *
 * ⚡ Responsibilities
 * - Consume {@link SeatFormContext} to retrieve and mutate `returnedSeats`
 * - Render all seats using the correct card component based on `layoutType`
 * - Provide seat removal functionality via a shared `removeSeat` callback
 * - Visualize metadata such as coordinates, availability, labels, and prices
 *
 * ⚡ Type Safety Notes
 * - This component centrally dispatches seat types:
 *   - `"SEAT"` → {@link SeatFormSubmitSeatCard}
 *   - Other structural types → {@link SeatFormSubmitStructureCard}
 * - Subtype correctness is therefore guaranteed **here**, so child components do
 *   not need their own runtime `layoutType` guards.
 *
 * ⚡ Example
 * ```tsx
 * <SeatFormContextProvider>
 *   <SeatFormSubmitList />
 * </SeatFormContextProvider>
 * ```
 */


import { FC } from 'react';
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import { SeatFormContext } from "@/pages/seats/context/form/SeatFormContext.ts";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import SeatFormSubmitSeatCard
    from "@/pages/screens/components/theatre-screens/admin/features/seat-submit/SeatFormSubmitSeatCard.tsx";
import SeatFormSubmitStructureCard
    from "@/pages/screens/components/theatre-screens/admin/features/seat-submit/SeatFormSubmitStructureCard.tsx";

/**
 * ⚡ SeatFormSubmitList Component
 *
 * Displays all seats from {@link SeatFormContext.returnedSeats} as cards.
 * Handles removal and delegates rendering to specialized card components based
 * on each seat’s `layoutType`.
 *
 * @component
 * @returns JSX.Element
 */
const SeatFormSubmitList: FC = () => {
    // ⚡ Access Context ⚡
    const { returnedSeats, setReturnedSeats } = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    // ⚡ Remove Seat From List ⚡
    const removeSeat = (_id: ObjectId) => {
        setReturnedSeats(prev => prev.filter(s => s._id !== _id));
    };

    // ⚡ Render ⚡
    return (
        <div className="grid grid-cols-1 gap-4">
            {returnedSeats.map((seat: SeatDetails) => {
                const { layoutType } = seat;

                if (layoutType === "SEAT") {
                    return (
                        <SeatFormSubmitSeatCard
                            seat={seat}
                            removeSeat={removeSeat}
                        />
                    );
                }

                return (
                    <SeatFormSubmitStructureCard
                        seat={seat}
                        removeSeat={removeSeat}
                    />
                );
            })}
        </div>
    );
};

export default SeatFormSubmitList;
