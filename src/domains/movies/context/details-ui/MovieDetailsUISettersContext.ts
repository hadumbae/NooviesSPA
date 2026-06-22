/**
 * @fileoverview Defines the context for managing UI state setters in the movie details view.
 */

import {createContext, Dispatch, SetStateAction} from "react";

/** State setters for controlling the visibility and editing modes of the movie details UI. */
export type MovieDetailsUISetters = {
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    setIsUpdatingPoster: Dispatch<SetStateAction<boolean>>;
    setIsDeletingPoster: Dispatch<SetStateAction<boolean>>;
    setIsDeleting: Dispatch<SetStateAction<boolean>>;
};

/** Context providing the state setters for the movie details user interface. */
export const MovieDetailsUISettersContext = createContext<MovieDetailsUISetters | undefined>(undefined);