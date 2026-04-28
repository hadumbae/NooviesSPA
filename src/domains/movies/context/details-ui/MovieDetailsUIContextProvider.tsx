/** @fileoverview Provider component for managing the transient UI states of the movie details view. */

import {ReactElement, ReactNode, useState} from 'react';
import {
    MovieDetailsUIContext,
    MovieDetailsUIStates
} from "@/domains/movies/context/details-ui/MovieDetailsUIContext.ts";

/** Props for the MovieDetailsUIContextProvider component. */
type ProviderProps = {
    children: ReactNode;
}

/**
 * Manages and distributes shared UI states for the movie details page via React Context.
 */
export function MovieDetailsUIContextProvider({children}: ProviderProps): ReactElement {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isUpdatingPoster, setIsUpdatingPoster] = useState<boolean>(false);
    const [isDeletingPoster, setIsDeletingPoster] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    /**
     * Consolidated state values and setters provided to consumers.
     */
    const values: MovieDetailsUIStates = {
        isEditing,
        setIsEditing,
        isUpdatingPoster,
        setIsUpdatingPoster,
        isDeletingPoster,
        setIsDeletingPoster,
        isDeleting,
        setIsDeleting,
    };

    return (
        <MovieDetailsUIContext.Provider value={values}>
            {children}
        </MovieDetailsUIContext.Provider>
    );
}