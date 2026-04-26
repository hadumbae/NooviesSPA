/**
 * @fileoverview Renders a single cell within the theatre screen seat layout grid.
 */

import {memo, ReactElement, useCallback} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatDetailsPanelContext} from "@/domains/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import SeatLayoutIconConstant from "@/domains/seats/constants/SeatLayoutIconConstant.ts";
import {Seat} from "@/domains/seats/schema/seat/Seat.types.ts";

/** Props for the ScreenSeatLayoutElement component. */
type ElementProps = {
    element: Seat | number | null;
};

const NON_SEAT_CSS = cn(
    SecondaryTextBaseCSS,
    "flex justify-center items-center select-none"
);

/**
 * Renders a grid element representing a seat, a coordinate label, or an empty placeholder.
 * Requires SeatDetailsPanelContext to manage seat selection and panel visibility.
 */
export function ScreenSeatLayoutElement(
    {element}: ElementProps
): ReactElement {
    const {setSeat, setIsPanelOpen} = useRequiredContext({
        context: SeatDetailsPanelContext,
        message: "Must be used within the SeatDetailsPanelContext.",
    });

    if (element === null) {
        return <div className={NON_SEAT_CSS}>•</div>;
    }

    if (typeof element === "number") {
        return <div className={NON_SEAT_CSS}>{element !== 0 && element}</div>;
    }

    const {layoutType} = element;
    const Icon = SeatLayoutIconConstant[layoutType];

    const onClick = useCallback(() => {
        setSeat(element);
        setIsPanelOpen(true);
    }, [element, setSeat, setIsPanelOpen]);

    return (
        <Button variant="link" className="p-1 hover:border hover:shadow" onClick={onClick}>
            <Icon size={20}/>
        </Button>
    );
}

export default memo(ScreenSeatLayoutElement);