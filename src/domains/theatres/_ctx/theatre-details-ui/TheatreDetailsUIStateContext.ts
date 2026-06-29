/**
 * @fileoverview React context and types for managing theatre details UI state flags.
 */

import {createContext} from "react";

/** UI state flags and setters for the theatre details view. */
export type TheatreDetailsUIStateValues = {
    isEditing: boolean;
    isDeleting: boolean;
    isAddingScreen: boolean;
    isAddingShowing: boolean;
}

/** React context for theatre details UI state. */
export const TheatreDetailsUIStateContext = createContext<TheatreDetailsUIStateValues | undefined>(undefined);