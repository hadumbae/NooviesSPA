/**
 * @fileoverview Custom hook for consuming the SeatPanelSetterContext within the seat details panel.
 */

import {useContext} from "react";
import {
    SeatPanelSetterContext,
    SeatPanelSetterContextValues
} from "@/domains/seats/_feat/seat-details-context/SeatPanelSetterContext.ts";

/**
 * Custom hook to safely consume the SeatPanelSetterContext.
 * @throws {Error} Throws an error if used outside of a SeatPanelContextProvider.
 */
export function useSeatPanelSetterContext(): SeatPanelSetterContextValues {
    const context = useContext(SeatPanelSetterContext);

    if (!context) {
        throw new Error('useSeatPanelSetterContext must be used within a SeatPanelContextProvider');
    }

    return context;
}