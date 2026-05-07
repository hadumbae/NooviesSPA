/**
 * @fileoverview Defines the context for managing the UI state of the genre details view.
 */
import {createContext} from "react";

/** State values for the genre details UI context. */
export type GenreDetailsUIStateContextValues = {
    isEditing: boolean;
    isDeleting: boolean;
    isUpdatingImage: boolean;
    isRemovingImage: boolean;
}

/** Context for accessing the current UI state of the genre details view. */
export const GenreDetailsUIStateContext = createContext<GenreDetailsUIStateContextValues | undefined>(undefined);
