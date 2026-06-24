/**
 * @fileoverview React context and types for theatre details UI state setters.
 */

import {createContext, Dispatch, SetStateAction} from "react";

/** Setters for the UI state flags used in the theatre details view. */
export type TheatreDetailsUISetterValues = {
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    setIsDeleting: Dispatch<SetStateAction<boolean>>;
    setIsAddingScreen: Dispatch<SetStateAction<boolean>>;
    setIsAddingShowing: Dispatch<SetStateAction<boolean>>;
}

/** React context providing setters for theatre details UI state. */
export const TheatreDetailsUISetterContext = createContext<TheatreDetailsUISetterValues | undefined>(undefined);