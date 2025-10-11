import { FC, PropsWithChildren, useState } from 'react';
import { MovieDetailsUIContext, MovieDetailsUIStates } from "@/pages/movies/context/MovieDetailsUIContext.ts";

/**
 * Provides and manages UI state for the movie details view.
 *
 * @remarks
 * This provider component initializes and supplies the {@link MovieDetailsUIContext}
 * to all child components within the movie details page.
 * It encapsulates transient UI states — such as edit mode, poster update status,
 * and deletion operations — enabling shared state management without prop drilling.
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
 * @example
 * Accessing the context in a child component:
 * ```tsx
 * const ui = useContext(MovieDetailsUIContext);
 * if (!ui) throw new Error("MovieDetailsUIContext not found");
 *
 * return (
 *   <button onClick={() => ui.setIsEditing(true)}>
 *     Edit Movie
 *   </button>
 * );
 * ```
 *
 * @see {@link MovieDetailsUIContext}
 * @see {@link MovieDetailsUIStates}
 */
const MovieDetailsUIContextProvider: FC<PropsWithChildren> = ({ children }) => {
    /**
     * Whether the movie details are currently in editing mode.
     */
    const [isEditing, setIsEditing] = useState<boolean>(false);

    /**
     * Whether a poster update operation (e.g., image upload) is active.
     */
    const [isUpdatingPoster, setIsUpdatingPoster] = useState<boolean>(false);

    /**
     * Whether a poster deletion operation is currently active.
     */
    const [isDeletingPoster, setIsDeletingPoster] = useState<boolean>(false);

    /**
     * Whether the movie itself is currently being deleted.
     */
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    /**
     * Consolidated UI state object provided to consumers of {@link MovieDetailsUIContext}.
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
};

export default MovieDetailsUIContextProvider;
