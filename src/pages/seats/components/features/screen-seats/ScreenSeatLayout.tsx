/**
 * @file ScreenSeatLayout
 * @description
 * Renders a complete visual grid of seats for a theatre screen using Tailwind CSS.
 *
 * This component formats seat data—grouped and sorted by their Y-axis (row)—into
 * a responsive grid with axis labels on both the left and right sides.
 *
 * It relies on:
 * - `organiseScreenSeatMap()` to produce grouped and sorted seat layout data.
 * - `ScreenSeatLayoutElement` to render individual seat cells and axis labels.
 *
 * The resulting grid uses CSS Grid with dynamic column sizing based on the
 * maximum X-coordinate detected in the data.
 */

import {FC, memo, useMemo} from "react";
import organiseScreenSeatMap from "@/pages/seats/hooks/features/admin/screen-seat-layout/organiseScreenSeatMap.ts";
import ScreenSeatLayoutElement from "@/pages/seats/components/features/screen-seats/ScreenSeatLayoutElement.tsx";
import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import keyForSeatElement from "@/pages/seats/utilities/screen-seats/keyForSeatElement.ts";

/**
 * Props for {@link ScreenSeatLayout}.
 *
 * @property seats An array of {@link SeatDetails} objects representing all seats
 * within a single screen. These seats must include valid `x`, `y`, and
 * `layoutType` values for grid placement.
 */
type GridProps = {
    seats: SeatDetails[];
};

/**
 * `ScreenSeatLayout`
 *
 * @component
 * Renders a grid-based seat layout with left and right axis labels.
 *
 * @remarks
 * - Determines the number of grid columns dynamically using `maxX`.
 * - Each row includes:
 *   - Left axis label (`y`)
 *   - One element for each seat or layout item
 *   - Right axis label (`y`)
 * - The grid uses:
 *   `grid-cols-[0.5fr_repeat(maxX+1,1fr)]`
 *
 * @param props.seats List of seat detail objects to display.
 *
 * @example
 * ```tsx
 * <ScreenSeatLayout seats={seatDetailsList} />
 * ```
 *
 * @returns A vertically stacked list of grid rows representing the entire screen layout.
 */
const ScreenSeatLayout: FC<GridProps> = ({seats}) => {
    // ⚡ Get Seat Layout ⚡
    const {sortedSeats, maxX} = organiseScreenSeatMap({seats});
    const seatEntries = useMemo(() => Array.from(sortedSeats), [sortedSeats]);

    // ⚡ Grid CSS ⚡
    const gridCSS = useMemo(() => `grid grid-cols-[0.5fr_repeat(${maxX + 1},1fr)] gap-1`, [maxX]);

    // ⚡ Render ⚡
    return (
        <div className="space-y-2">
            {seatEntries.map(([y, sortedSeats]) =>
                <div className={gridCSS} key={y}>
                    <ScreenSeatLayoutElement element={y}/>

                    {sortedSeats.map((element, index) => (
                        <ScreenSeatLayoutElement key={keyForSeatElement(element, index)} element={element}/>
                    ))}

                    <ScreenSeatLayoutElement element={y}/>
                </div>
            )}
        </div>
    );
};

export default memo(ScreenSeatLayout);
