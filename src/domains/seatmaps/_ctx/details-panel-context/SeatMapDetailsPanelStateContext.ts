/**
 * @fileoverview Context definition for managing the state of the seat map details panel.
 */

import {createContext} from "react";
import {SeatMapDetails} from "@/domains/seatmaps/_schema";

/** State values for the seat map details panel context. */
export type SeatMapDetailsPanelStateContextValues = {
    seatMap: SeatMapDetails | null;
    isPanelOpen: boolean;
    isEditing: boolean;
};

/** Context provider for the seat map details panel state. */
export const SeatMapDetailsPanelStateContext =
    createContext<SeatMapDetailsPanelStateContextValues | undefined>(undefined);

SeatMapDetailsPanelStateContext.displayName = "SeatMapDetailsPanelStateContext";
