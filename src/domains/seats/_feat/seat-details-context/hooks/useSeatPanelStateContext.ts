/**
 * @fileoverview Custom hook for consuming the SeatPanelStateContext within the seat details panel.
 */

import {useContext} from "react";
import {
    SeatPanelStateContext,
    SeatPanelStateContextValues
} from "@/domains/seats/_feat/seat-details-context/context";

/**
 * Custom hook to safely consume the SeatPanelStateContext.
 */
export function useSeatPanelStateContext(): SeatPanelStateContextValues {
    const context = useContext(SeatPanelStateContext);

    if (!context) {
        throw new Error('useSeatPanelStateContext must be used within a SeatPanelContextProvider');
    }

    return context;
}