/**
 * @fileoverview Custom hook for consuming the SeatPanelStateContext within the seat details panel.
 */

import {useContext} from "react";
import {
    SeatPanelStateContext,
    SeatPanelStateContextValues
} from "@/domains/seats/_feat/seat-details-context/SeatPanelStateContext.ts";

/**
 * Custom hook to safely consume the SeatPanelStateContext.
 * @throws {Error} Throws an error if used outside of a SeatPanelContextProvider.
 */
export function useSeatPanelStateContext(): SeatPanelStateContextValues {
    const context = useContext(SeatPanelStateContext);

    if (!context) {
        throw new Error('useSeatPanelStateContext must be used within a SeatPanelContextProvider');
    }

    return context;
}