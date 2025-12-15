import { createContext, Dispatch, SetStateAction } from "react";
import { SeatMapDetails } from "@/pages/seatmap/schema/model/SeatMap.types.ts";

/**
 * @summary
 * Context value shape for the Seat Map details panel.
 *
 * @remarks
 * Encapsulates selection, visibility, and edit state for
 * admin-facing seat map detail interactions.
 */
export type SeatMapDetailsPanelContextValues = {
    /** Currently selected seat map (or `null` when none is selected) */
    seatMap: SeatMapDetails | null;
    setSeatMap: Dispatch<SetStateAction<SeatMapDetails | null>>;

    /** Whether the details panel is open */
    isPanelOpen: boolean;
    setIsPanelOpen: Dispatch<SetStateAction<boolean>>;

    /** Whether the panel is in editing mode */
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};

/**
 * @summary
 * React context for Seat Map details panel state.
 *
 * @remarks
 * Consumers must be wrapped in {@link SeatMapDetailsPanelContextProvider}.
 */
export const SeatMapDetailsPanelContext =
    createContext<SeatMapDetailsPanelContextValues | undefined>(undefined);

SeatMapDetailsPanelContext.displayName = "SeatMapDetailsPanelContext";
