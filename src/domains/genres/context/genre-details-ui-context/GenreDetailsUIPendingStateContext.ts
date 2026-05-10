/**
 * @fileoverview Context for tracking pending UI states during genre detail operations.
 */

import {createContext} from "react";

/** Values representing the loading or pending status of various genre-related UI actions. */
export type GenreDetailsUIPendingStateContextValues = {
    isGenreEditing: boolean;
    isGenreDeleting: boolean;
    isImageUpdatePending: boolean;
    isImageRemovalPending: boolean;
}

/** React context for accessing genre detail UI pending states. */
export const GenreDetailsUIPendingStateContext = createContext<GenreDetailsUIPendingStateContextValues | undefined>(undefined);
