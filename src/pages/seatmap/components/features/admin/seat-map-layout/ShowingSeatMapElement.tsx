import { SeatMapDetails } from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import SeatLayoutNonSeatElement
    from "@/pages/seats/components/features/screen-seats/SeatLayoutNonSeatElement.tsx";
import SeatLayoutIconConstant
    from "@/pages/seats/constants/SeatLayoutIconConstant.ts";
import { Button } from "@/common/components/ui/button.tsx";
import { useCallback } from "react";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import { SeatMapDetailsPanelContext }
    from "@/pages/seatmap/context/details-panel-context/SeatMapDetailsPanelContext.ts";

/**
 * @type ShowingSeatMapElementProps
 * @description
 * Props for {@link ShowingSeatMapElement}.
 */
type ShowingSeatMapElementProps = {
    /**
     * The element to render in the seat layout.
     *
     * Can be:
     * - A `SeatMapDetails` object representing a real seat
     * - A `number` used for row or column labels
     * - `null` for empty spacing elements
     */
    element: SeatMapDetails | number | null;
};

/**
 * @component ShowingSeatMapElement
 * @description
 * Renders a single element within a showing's seat map layout.
 *
 * Behavior based on `element` type:
 * - `null`: Renders a placeholder dot (`•`) for empty spaces.
 * - `number`: Renders a label for row/column numbering.
 * - `SeatMapDetails`: Renders an interactive seat button using the
 *   correct icon from {@link SeatLayoutIconConstant}. Clicking a seat
 *   opens the seat details panel via {@link SeatMapDetailsPanelContext}.
 */
const ShowingSeatMapElement = ({ element }: ShowingSeatMapElementProps) => {
    // --- Access Context ---
    const { setSeatMap, setIsPanelOpen } = useRequiredContext({
        context: SeatMapDetailsPanelContext,
    });

    // --- Empty Element ---
    if (!element) {
        return (
            <SeatLayoutNonSeatElement>
                •
            </SeatLayoutNonSeatElement>
        );
    }

    // --- Number Legend ---
    if (typeof element === "number") {
        return (
            <SeatLayoutNonSeatElement>
                {element !== 0 && element}
            </SeatLayoutNonSeatElement>
        );
    }

    // --- Seat Map ---
    const { seat: { layoutType } } = element;
    const Icon = SeatLayoutIconConstant[layoutType];

    const onClick = useCallback(
        () => {
            setSeatMap(element);
            setIsPanelOpen(true);
        },
        [element, setSeatMap, setIsPanelOpen],
    );

    return (
        <Button
            variant="link"
            className="p-1 hover:border hover:shadow"
            onClick={onClick}
        >
            <Icon size={20} />
        </Button>
    );
};

export default ShowingSeatMapElement;
