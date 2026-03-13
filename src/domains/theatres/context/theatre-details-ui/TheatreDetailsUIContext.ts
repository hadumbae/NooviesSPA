import {createContext, Dispatch, SetStateAction} from "react";

/**
 * Represents the UI state flags for theatre details,
 * along with their corresponding setters.
 *
 * - `isEditing` / `setIsEditing`: Tracks whether the theatre details are in edit mode.
 * - `isDeleting` / `setIsDeleting`: Tracks whether a delete action is in progress.
 * - `isAddingScreen` / `setIsAddingScreen`: Tracks whether a screen is being added.
 * - `isAddingShowing` / `setIsAddingShowing`: Tracks whether a showing is being added.
 */
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

/**
 * React context for theatre details UI state.
 *
 * Provides state flags and setters for editing, deleting, adding screens,
 * and adding showings. The default value is `undefined` and should be
 * provided by a context provider.
 */
export const TheatreDetailsUIContext = createContext<TheatreDetailsUIStates | undefined>(undefined);
