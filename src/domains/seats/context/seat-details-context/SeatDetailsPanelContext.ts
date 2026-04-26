/**
 * @fileoverview React context for managing the state of the seat details and editing interface.
 */

import { createContext, Dispatch, SetStateAction } from "react";
import {Seat} from "@/domains/seats/schema/seat/Seat.types.ts";

/** Context values for managing seat selection, panel visibility, and mutation states. */
export type SeatDetailsPanelContextValues = {
    seat: Seat | null;
    setSeat: Dispatch<SetStateAction<Seat | null>>;
    isPanelOpen: boolean;
    setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    showDeleteWarning: boolean;
    setShowDeleteWarning: Dispatch<SetStateAction<boolean>>;
};

/**
 * Provides state and control functions for the seat details side panel and associated dialogs.
 */
export const SeatDetailsPanelContext =
    createContext<SeatDetailsPanelContextValues | undefined>(undefined);