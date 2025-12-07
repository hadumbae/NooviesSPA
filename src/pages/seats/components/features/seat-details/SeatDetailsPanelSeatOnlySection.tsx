/**
 * @file SeatDetailsPanelSeatSection
 * @description
 * Renders the detailed **seat-only** information section inside the
 * seat-details panel.
 *
 * This component consumes {@link SeatDetailsPanelContext} and displays
 * metadata for a selected **physical seat**. Structural layout elements
 * such as aisles, stairs, or spacers are **not allowed** here. If the
 * selected layout element is not a seat (`layoutType !== "SEAT"`), the
 * component throws an error to prevent silent misuse.
 *
 * Behavior:
 * - Throws an error when rendered without a seat in context.
 * - Throws an error when the selected layout element is not a physical seat.
 * - Displays seat metadata in a two-row grid including:
 *   - Row, seat number, seat type
 *   - Coordinates (X,Y), price multiplier, availability
 *
 * Layout:
 * - Two grid rows (`grid-cols-3`) displaying key-value pairs via
 *   {@link DetailsCardSpan} components.
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatDetailsPanelContext} from "@/pages/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import SeatTypeLabelMap from "@/pages/seats/constants/SeatTypeLabelMap.ts";

/**
 * Seat information section for the seat-details panel.
 *
 * Extracts the currently selected seat from
 * {@link SeatDetailsPanelContext} and renders a formatted metadata
 * section. Only seats with `layoutType: "SEAT"` are permitted. Any
 * structural or non-seat layout element results in an error, since this
 * component is intended exclusively for physical seat data.
 *
 * @throws {Error}
 * - Thrown when no seat is present in context.
 * - Thrown when the layout element is not a physical seat
 *   (`layoutType !== "SEAT"`).
 *
 * @returns {JSX.Element}
 * A `<section>` element containing formatted seat metadata.
 *
 * @example
 * ```tsx
 * <SeatDetailsPanelContextProvider>
 *   <SeatDetailsPanelSeatOnlySection />
 * </SeatDetailsPanelContextProvider>
 * ```
 */
const SeatDetailsPanelSeatOnlySection = () => {
    // ⚡ Access Context ⚡
    const {seat} = useRequiredContext({
        context: SeatDetailsPanelContext,
        message: "Must be used within provider for `SeatDetailsPanelContext`."
    });

    // ⚡ Validate Seat ⚡
    if (!seat) throw new Error("Seat is missing in component.");
    if (seat.layoutType !== "SEAT") throw new Error("Seat must be of `SEAT` layout type.");

    // ⚡ Render Seat ⚡
    const {row, x, y, seatNumber, seatType, priceMultiplier, isAvailable} = seat;

    return (
        <section className="space-y-4 p-2">
            <div className="grid grid-cols-3 gap-4 text-center">
                <DetailsCardSpan label="Row" text={row}/>
                <DetailsCardSpan label="Seat Number" text={seatNumber}/>
                <DetailsCardSpan label="Type" text={SeatTypeLabelMap[seatType]}/>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <DetailsCardSpan label="X, Y" text={`${x}, ${y}`}/>
                <DetailsCardSpan label="Price Multiplier" text={`x${priceMultiplier}`}/>
                <DetailsCardSpan label="Is Available?" text={isAvailable ? "Yes" : "No"}/>
            </div>
        </section>
    );
};

export default SeatDetailsPanelSeatOnlySection;
