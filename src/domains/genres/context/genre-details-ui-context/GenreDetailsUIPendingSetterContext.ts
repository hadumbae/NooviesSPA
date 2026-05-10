/**
 * @fileoverview Context for updating the pending states of genre detail UI operations.
 */

import {createContext, Dispatch, SetStateAction} from "react";

/** State setter functions for genre-related UI pending flags. */
export type GenreDetailsUIPendingSetterContextValues = {
    setIsGenreEditing: Dispatch<SetStateAction<boolean>>;
    setIsGenreDeleting: Dispatch<SetStateAction<boolean>>;
    setIsImageUpdatePending: Dispatch<SetStateAction<boolean>>;
    setIsImageRemovalPending: Dispatch<SetStateAction<boolean>>;
}

/** Context providing setters for genre detail UI pending states. */
export const GenreDetailsUIPendingSetterContext = createContext<GenreDetailsUIPendingSetterContextValues | undefined>(undefined);
