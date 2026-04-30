/**
 * @fileoverview React context and types for theatre details UI state flags.
 */

import {createContext, Dispatch, SetStateAction} from "react";

/** Represents the UI state flags for theatre details, along with their corresponding setters. */
export type TheatreDetailsUIStates = {
    /** Whether the theatre is currently being edited */
    isEditing: boolean;

    /** Setter for `isEditing` */
    setIsEditing: Dispatch<SetStateAction<boolean>>;

    /** Whether a delete action is in progress */
    isDeleting: boolean;

    /** Setter for `isDeleting` */
    setIsDeleting: Dispatch<SetStateAction<boolean>>;

    /** Whether a new screen is being added */
    isAddingScreen: boolean;

    /** Setter for `isAddingScreen` */
    setIsAddingScreen: Dispatch<SetStateAction<boolean>>;

    /** Whether a new showing is being added */
    isAddingShowing: boolean;

    /** Setter for `isAddingShowing` */
    setIsAddingShowing: Dispatch<SetStateAction<boolean>>;
}

/** React context for theatre details UI state. */
export const TheatreDetailsUIContext = createContext<TheatreDetailsUIStates | undefined>(undefined);