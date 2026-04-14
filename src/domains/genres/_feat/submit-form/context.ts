/**
 * @fileoverview React Context for sharing Genre form state and behavioral flags.
 * Enables nested components to access the form identifier and submission status.
 */

import {createContext} from "react";

export type GenreFormContextValues = {
    formID: string;
    isPending?: boolean;
};

/**
 * Context for Genre form components to access shared identifiers and UI states.
 */
export const GenreFormContext = createContext<GenreFormContextValues | undefined>(undefined);