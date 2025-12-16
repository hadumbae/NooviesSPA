/**
 * @file ShowingDetailsPageContext.ts
 * @summary
 * React context for sharing Showing Details page state.
 *
 * Exposes the active {@link ShowingDetails} and its associated
 * {@link SeatMapDetails} collection to all descendants of the
 * Showing Details page.
 */

import { ShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import { SeatMapDetails } from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import { createContext } from "react";

/**
 * Values exposed by {@link ShowingDetailsPageContext}.
 */
export type ShowingDetailsPageContextValues = {
    /**
     * Detailed information about the currently selected showing.
     */
    showing: ShowingDetails;

    /**
     * Seat map details associated with the showing.
     */
    seating: SeatMapDetails[];
};

/**
 * Context for the Showing Details page.
 *
 * Must be provided by a parent `ShowingDetailsPageContext.Provider`.
 * The context value is intentionally `undefined` by default to allow
 * consumers or helper hooks to enforce provider presence.
 */
export const ShowingDetailsPageContext =
    createContext<ShowingDetailsPageContextValues | undefined>(undefined);

/**
 * Human-readable display name for easier debugging in React DevTools.
 */
ShowingDetailsPageContext.displayName = "ShowingDetailsPageContext";
