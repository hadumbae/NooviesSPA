/**
 * @file ScreenSeatLayout
 * @description
 * Renders a grid of theatre seats with left and right row labels using Tailwind CSS.
 *
 * Uses `organiseScreenSeatMap` to group and sort seats by row (Y-axis), and
 * `ScreenSeatLayoutElement` to render each seat or label.
 */

import { memo, ReactElement, useMemo } from "react";
import organiseScreenSeatMap from "@/pages/seats/hooks/features/admin/screen-seat-layout/organiseScreenSeatMap.ts";
import ScreenSeatLayoutElement from "@/pages/seats/components/features/screen-seats/ScreenSeatLayoutElement.tsx";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import keyForSeatElement from "@/pages/seats/utilities/screen-seats/keyForSeatElement.ts";

/**
 * Props for {@link ScreenSeatLayout}.
 *
 * @property seats Array of {@link SeatDetails} representing all seats in a screen.
 * Seats must include `x`, `y`, and `layoutType`.
 */
type GridProps = {
    seats: SeatDetails[];
};

/**
 * `ScreenSeatLayout`
 *
 * @component
 * Renders a seat layout grid with left and right axis labels per row.
 *
 * @remarks
 * - Columns are dynamic based on the maximum X-coordinate (`maxX`).
 * - Each row renders:
 *   1. Left label (`y`)
 *   2. Seat elements
 *   3. Right label (`y`)
 *
 * @example
 * ```tsx
 * <ScreenSeatLayout seats={seatDetailsList} />
 * ```
 *
 * @param seats List of seat detail objects.
 * @returns Grid of rows representing the theatre screen.
 */
const ScreenSeatLayout = ({ seats }: GridProps): ReactElement => {
    // ⚡ Group and sort seats ⚡
    const { sortedSeats, maxX } = organiseScreenSeatMap({ seats });
    const seatEntries = useMemo(() => Array.from(sortedSeats), [sortedSeats]);

    // ⚡ Grid style ⚡
    const gridStyle = useMemo(
        () => ({
            display: "grid",
            gridTemplateColumns: `0.5fr repeat(${maxX + 1}, 1fr)`,
            gap: "0.25rem",
        }),
        [maxX]
    );

    // ⚡ Render grid ⚡
    return (
        <div className="space-y-2">
            {seatEntries.map(([y, rowSeats]) => (
                <div style={gridStyle} key={y}>
                    <ScreenSeatLayoutElement element={y} />

                    {rowSeats.map((element, index) => (
                        <ScreenSeatLayoutElement
                            key={keyForSeatElement(element, index)}
                            element={element}
                        />
                    ))}

                    <ScreenSeatLayoutElement element={y} />
                </div>
            ))}
        </div>
    );
};

export default memo(ScreenSeatLayout);
