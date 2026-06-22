/**
 * @fileoverview Context definition for managing UI interaction states within the movie details view.
 */

import {createContext} from "react";

/** Collection of boolean states and setters for movie details UI interactions. */
export type MovieDetailsUIStates = {
    isEditing: boolean;
    isUpdatingPoster: boolean;
    isDeletingPoster: boolean;
    isDeleting: boolean;
};

/** Context object for accessing movie details UI state throughout the component tree. */
export const MovieDetailsUIStatesContext = createContext<MovieDetailsUIStates | undefined>(undefined);
