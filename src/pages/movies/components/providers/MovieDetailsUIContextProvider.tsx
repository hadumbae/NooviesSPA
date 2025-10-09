import { FC, PropsWithChildren, useState } from 'react';
import { MovieDetailsUIContext, MovieDetailsUIStates } from "@/pages/movies/context/MovieDetailsUIContext.ts";

/**
 * Provides UI state management for the movie details view.
 *
 * @description
 * This context provider encapsulates and supplies UI-related state for
 * components within the movie details page, such as:
 * - Whether the details are in **edit mode**
 * - Whether a **poster image update** is in progress
 * - Whether a **deletion operation** is underway
 *
 * It centralizes transient UI logic so that child components can
 * easily read and update shared states without prop drilling.
 *
 * @example
 * ```tsx
 * <MovieDetailsUIContextProvider>
 *   <MovieDetailsHeader />
 *   <MovieDetailsBody />
 *   <MovieDetailsPosterEditor />
 * </MovieDetailsUIContextProvider>
 * ```
 *
 * @remarks
 * Use this provider near the root of your movie details view hierarchy.
 * Child components can access the context via:
 * ```ts
 * const ui = useContext(MovieDetailsUIContext);
 * ```
 */
const MovieDetailsUIContextProvider: FC<PropsWithChildren> = ({ children }) => {
    /** Indicates whether the movie details are currently being edited. */
    const [isEditing, setIsEditing] = useState<boolean>(false);

    /** Indicates whether a poster image update operation is in progress. */
    const [isUpdatingPoster, setIsUpdatingPoster] = useState<boolean>(false);

    /** Indicates whether the movie is currently being deleted. */
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    /** Consolidated UI state values exposed to the context consumers. */
    const values: MovieDetailsUIStates = {
        isEditing,
        setIsEditing,
        isUpdatingPoster,
        setIsUpdatingPoster,
        isDeleting,
        setIsDeleting,
    };

    return (
        <MovieDetailsUIContext.Provider value={values}>
            {children}
        </MovieDetailsUIContext.Provider>
    );
};

export default MovieDetailsUIContextProvider;
