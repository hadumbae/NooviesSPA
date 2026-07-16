/**
 * @fileoverview Renders a single element within a showing's seat map layout.
 */

import {ReactElement, useCallback} from "react";
import {Button} from "@/common/components/ui";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";

import {SeatLayoutIconConstant} from "@/domains/seats";
import {SeatLayoutNonSeatElement} from "@/views/admin/seats";
import {SeatMapDetails, SeatMapDetailsPanelSetterContext} from "@/domains/seatmaps";

/** Props for the ShowingSeatMapElement component. */
type ShowingSeatMapElementProps = {
    element: SeatMapDetails | number | null;
};

/** Renders a single interactive seat or a non-interactive element inside the seating grid. */
export function ShowingSeatMapElement({element}: ShowingSeatMapElementProps): ReactElement {
    const {setSeatMap, setIsPanelOpen} = useRequiredContext({context: SeatMapDetailsPanelSetterContext});

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

