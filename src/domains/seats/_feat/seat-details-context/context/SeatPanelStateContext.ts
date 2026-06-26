/**
 * @fileoverview React context for managing the state of the seat details and editing interface.
 */

import {createContext} from "react";
import { SeatDetails } from "@/domains/seats/_schema/model";

/** Context values for managing seat selection and panel data states. */
export type SeatPanelStateContextValues = {
    seat: SeatDetails | null;
    isPanelOpen: boolean;
};

/** Provides state and control functions for the seat details side panel and associated dialogs. */
export const SeatPanelStateContext = createContext<SeatPanelStateContextValues | undefined>(undefined);