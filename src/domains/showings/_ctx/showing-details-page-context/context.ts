/**
 * @fileoverview React context for sharing state across the Showing Details page.
 */

import {createContext} from "react";
import {ShowingDetails} from "@/domains/showings/_schema/showing/ShowingDetailsSchema.ts";

import {SeatMapDetails} from "@/domains/seatmaps/_schema/model/SeatMapDetailsSchema";

/** Values exposed by the ShowingDetailsPageContext. */
export type ShowingDetailsPageContextValues = {
    showing: ShowingDetails;
    seating: SeatMapDetails[];
};

/** Context for the Showing Details page that requires a provider. */
export const ShowingDetailsPageContext = createContext<ShowingDetailsPageContextValues | undefined>(undefined);

/** Human-readable display name for React DevTools. */
ShowingDetailsPageContext.displayName = "ShowingDetailsPageContext";
