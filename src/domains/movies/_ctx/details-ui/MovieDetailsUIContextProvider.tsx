/** @fileoverview Provider component for managing the transient UI states of the movie details view. */

import {ReactElement, ReactNode, useState} from 'react';
import {
    MovieDetailsUIStates,
    MovieDetailsUIStatesContext
} from "@/domains/movies/_ctx/details-ui/MovieDetailsUIStatesContext.ts";
import {MovieDetailsUISetters, MovieDetailsUISettersContext} from "@/domains/movies";

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
    const stateValues: MovieDetailsUIStates = {
        isEditing,
        isUpdatingPoster,
        isDeletingPoster,
        isDeleting,
    };

    const setterValues: MovieDetailsUISetters = {
        setIsEditing,
        setIsUpdatingPoster,
        setIsDeletingPoster,
        setIsDeleting,
    };

    return (
        <MovieDetailsUIStatesContext.Provider value={stateValues}>
            <MovieDetailsUISettersContext.Provider value={setterValues}>
                {children}
            </MovieDetailsUISettersContext.Provider>
        </MovieDetailsUIStatesContext.Provider>
    );
}