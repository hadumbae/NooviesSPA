/**
 * @fileoverview Renders a single cell within the theatre screen seat layout grid.
 */

import {ReactElement} from "react";
import {Button} from "@/views/common/_comp/ui";
import {SeatDetails, SeatLayoutIconConstant, useSeatPanelSetterContext} from "@/domains/seats";

/** Props for the ScreenSeatLayoutElement component. */
type ElementProps = {
    element: SeatDetails | number | null;
};

const NON_SEAT_CSS = "secondary-text flex justify-center items-center select-none";

/**
 * Renders a grid element representing a seat, a coordinate label, or an empty placeholder.
 */
export function ScreenSeatLayoutElement(
    {element}: ElementProps
): ReactElement {
    const {setSeat, setIsPanelOpen} = useSeatPanelSetterContext();

    if (element === null) {
        return <div className={NON_SEAT_CSS}>•</div>;
    }

    if (typeof element === "number") {
        return <div className={NON_SEAT_CSS}>{element !== 0 && element}</div>;
    }

    const {layoutType} = element;
    const Icon = SeatLayoutIconConstant[layoutType];

    return (
        <Button
            variant="link"
            className="p-1 hover:border hover:shadow"
            onClick={() => {
                setIsPanelOpen(true);
                setSeat(element);
            }}
        >
            <Icon size={20}/>
        </Button>
    );
}

