/**
 * @fileoverview Context for updating the UI state of the genre details view.
 */
import {createContext, Dispatch, SetStateAction} from "react";

/** State setter functions for managing genre details UI visibility. */
export type GenreDetailsUISetterContextValues = {
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    setIsDeleting: Dispatch<SetStateAction<boolean>>;
    setIsUpdatingImage: Dispatch<SetStateAction<boolean>>;
    setIsRemovingImage: Dispatch<SetStateAction<boolean>>;
}

/** Context providing setters to toggle editing and deletion states in the genre details UI. */
export const GenreDetailsUISetterContext = createContext<GenreDetailsUISetterContextValues | undefined>(undefined);
