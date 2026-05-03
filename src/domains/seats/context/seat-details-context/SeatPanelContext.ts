/**
 * @fileoverview React context for managing the state of the seat details and editing interface.
 */

import { createContext, Dispatch, SetStateAction } from "react";

import {SeatDetails} from "@/domains/seats/schema/model";

/** Context values for managing seat selection, panel visibility, and mutation states. */
export type SeatDetailsPanelContextValues = {
    seat: SeatDetails | null;
    setSeat: Dispatch<SetStateAction<SeatDetails | null>>;
    isPanelOpen: boolean;
    setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
};

/** Provides state and control functions for the seat details side panel and associated dialogs. */
export const SeatPanelContext = createContext<SeatDetailsPanelContextValues | undefined>(undefined);