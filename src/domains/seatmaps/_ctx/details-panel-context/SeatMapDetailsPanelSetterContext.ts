/**
 * @fileoverview Context for updating the state of the seat map details panel.
 */

import { createContext, Dispatch, SetStateAction } from "react";
import {SeatMapDetails} from "@/domains/seatmaps/_schema";

/** State setter functions for managing the seat map details panel. */
export type SeatMapDetailsPanelSetterContextValues = {
    setSeatMap: Dispatch<SetStateAction<SeatMapDetails | null>>;
    setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};

/** React context providing setters for the seat map details panel state. */
export const SeatMapDetailsPanelSetterContext =
    createContext<SeatMapDetailsPanelSetterContextValues | undefined>(undefined);

SeatMapDetailsPanelSetterContext.displayName = "SeatMapDetailsPanelSetterContext";
