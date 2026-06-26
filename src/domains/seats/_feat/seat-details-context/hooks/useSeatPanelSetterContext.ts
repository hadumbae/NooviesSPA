/**
 * @fileoverview Custom hook for consuming the SeatPanelSetterContext within the seat details panel.
 */

import {useContext} from "react";
import {
    SeatPanelSetterContext,
    SeatPanelSetterContextValues
} from "@/domains/seats/_feat/seat-details-context/context";

/**
 * Custom hook to safely consume the SeatPanelSetterContext.
 */
export function useSeatPanelSetterContext(): SeatPanelSetterContextValues {
    const context = useContext(SeatPanelSetterContext);

    if (!context) {
        throw new Error('useSeatPanelSetterContext must be used within a SeatPanelContextProvider');
    }

    return context;
}