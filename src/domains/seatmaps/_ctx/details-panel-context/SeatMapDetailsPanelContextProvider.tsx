/**
 * @fileoverview Provider component that manages state and setters for the seat map details panel.
 */

import {ReactElement, ReactNode, useState} from "react";
import {SeatMapDetails} from "@/domains/seatmaps/_schema";
import {
    SeatMapDetailsPanelStateContext,
    SeatMapDetailsPanelStateContextValues,
} from "@/domains/seatmaps/_ctx/details-panel-context/SeatMapDetailsPanelStateContext.ts";
import {
    SeatMapDetailsPanelSetterContext,
    SeatMapDetailsPanelSetterContextValues
} from "@/domains/seatmaps/_ctx/details-panel-context/SeatMapDetailsPanelSetterContext.ts";

/** Props for the SeatMapDetailsPanelContextProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/**
 * Context provider that manages the visibility, editing state, and data for the seat map details panel.
 * Wraps children with both state and setter contexts.
 */
export function SeatMapDetailsPanelContextProvider({children}: ProviderProps): ReactElement {
    const [seatMap, setSeatMap] = useState<SeatMapDetails | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

    const stateValues: SeatMapDetailsPanelStateContextValues = {seatMap, isEditing, isPanelOpen};
    const setterValues: SeatMapDetailsPanelSetterContextValues = {setSeatMap, setIsEditing, setIsPanelOpen};

    return (
        <SeatMapDetailsPanelStateContext.Provider value={stateValues}>
            <SeatMapDetailsPanelSetterContext.Provider value={setterValues}>
                {children}
            </SeatMapDetailsPanelSetterContext.Provider>
        </SeatMapDetailsPanelStateContext.Provider>
    );
}


