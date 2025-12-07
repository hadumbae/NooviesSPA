/**
 * @file ScreenSeatLayoutElement
 * @description
 * Renders a single cell within the screen seat layout grid.
 *
 * A cell can represent:
 * - A **seat** (`SeatDetails`) — rendered with an icon and clickable to open the edit panel.
 * - A **row/column label** (`number`) — displayed as text.
 * - An **empty placeholder** (`null`) — displayed as a centered dot.
 *
 * When a seat cell is clicked, this component updates the seat-editing context
 * via {@link SeatDetailsPanelContext}, setting the active seat and opening the
 * edit panel.
 */

import { FC, memo, useCallback } from "react";
import { Button } from "@/common/components/ui/button.tsx";
import { cn } from "@/common/lib/utils.ts";
import { SecondaryTextBaseCSS } from "@/common/constants/css/TextCSS.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import { SeatDetailsPanelContext } from "@/pages/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import SeatLayoutIconConstant from "@/pages/seats/constants/SeatLayoutIconConstant.ts";

type ElementProps = {
    /**
     * A value representing what the layout cell displays.
     *
     * - `SeatDetails` → A real seat in the layout grid
     * - `number` → A row index or axis label
     * - `null` → A placeholder or spacer cell
     */
    element: SeatDetails | number | null;
};

const NON_SEAT_CSS = cn(
    SecondaryTextBaseCSS,
    "flex justify-center items-center select-none"
);

/**
 * A memoized component that renders an individual element inside the screen
 * seat layout grid. Handles seat rendering, labeling, and click interactions.
 *
 * @param props.element The grid element to render (seat, label, or placeholder).
 *
 * @example
 * ```tsx
 * <ScreenSeatLayoutElement element={seatDetails} />
 * <ScreenSeatLayoutElement element={3} />         // Column or row index
 * <ScreenSeatLayoutElement element={null} />      // Empty cell
 * ```
 *
 * @returns A grid cell appropriate to the provided `element` type.
 */
const ScreenSeatLayoutElement: FC<ElementProps> = ({ element }) => {
    // ⚡ Access Context ⚡
    const { setSeat, setIsPanelOpen } = useRequiredContext({
        context: SeatDetailsPanelContext,
        message: "Must be used within the `SeatEditFormContext`.",
    });

    // ⚡ Layout Renders ⚡

    if (element === null) {
        return <div className={NON_SEAT_CSS}>•</div>;
    }

    if (typeof element === "number") {
        return <div className={NON_SEAT_CSS}>{element !== 0 && element}</div>;
    }

    // ⚡ Seat Icon ⚡

    const { layoutType } = element;
    const Icon = SeatLayoutIconConstant[layoutType];

    // ⚡ Context Handler ⚡

    const onClick = useCallback(() => {
        setSeat(element);
        setIsPanelOpen(true);
    }, [element, setSeat, setIsPanelOpen]);

    // ⚡ Seat Render ⚡

    return (
        <Button variant="link" className="p-1 hover:border hover:shadow" onClick={onClick}>
            <Icon size={20} />
        </Button>
    );
};

export default memo(ScreenSeatLayoutElement);
