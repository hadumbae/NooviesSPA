/**
 * @fileoverview React context for managing the setter state of the seat details panel interface.
 */

import {createContext, Dispatch, SetStateAction} from "react";
import {SeatDetails} from "@/domains/seats/_schema";

/** Context values for managing setter functions for seat selection and panel visibility. */
export type SeatPanelSetterContextValues = {
    setSeat: Dispatch<SetStateAction<SeatDetails | null>>;
    setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
};

/** Provides setter control functions for the seat details side panel and associated dialogs. */
export const SeatPanelSetterContext = createContext<SeatPanelSetterContextValues | undefined>(undefined);