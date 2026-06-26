/**
 * @fileoverview Renders a single element within a showing's seat map layout.
 */

import {ReactElement, useCallback} from "react";
import {Button} from "@/common/components/ui";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";

import {SeatLayoutIconConstant} from "@/domains/seats";
import {SeatMapDetails} from "@/domains/seatmap/schema/model/SeatMap.types.ts";
import {
    SeatMapDetailsPanelContext
} from "@/domains/seatmap/context/details-panel-context/SeatMapDetailsPanelContext.ts";
import {SeatLayoutNonSeatElement} from "@/views/admin/seats";

/** Props for the ShowingSeatMapElement component. */
type ShowingSeatMapElementProps = {
    element: SeatMapDetails | number | null;
};

/** Renders a single interactive seat or a non-interactive element inside the seating grid. */
export function ShowingSeatMapElement({element}: ShowingSeatMapElementProps): ReactElement {
    const {setSeatMap, setIsPanelOpen} = useRequiredContext({context: SeatMapDetailsPanelContext});

    if (!element) {
        return (
            <SeatLayoutNonSeatElement>
                •
            </SeatLayoutNonSeatElement>
        );
    }

    if (typeof element === "number") {
        return (
            <SeatLayoutNonSeatElement>
                {element !== 0 && element}
            </SeatLayoutNonSeatElement>
        );
    }

    const {seat: {layoutType}} = element;
    const Icon = SeatLayoutIconConstant[layoutType];

    const onClick = useCallback(
        () => {
            setSeatMap(element);
            setIsPanelOpen(true);
        },
        [element, setSeatMap, setIsPanelOpen],
    );

    return (
        <Button variant="link" className="p-1 hover:border hover:shadow" onClick={onClick}>
            <Icon size={20}/>
        </Button>
    );
}

