import { createContext, Dispatch, SetStateAction } from "react";

/**
 * Represents the UI state and setters for the movie details page.
 *
 * @remarks
 * This type defines a collection of boolean flags and their associated setters
 * that control various interactive UI modes — such as editing, poster updates,
 * and deletion operations — in the movie details view.
 *
 * Components can consume this state via {@link MovieDetailsUIContext}
 * to both read and modify the UI state in a centralized way.
 */
export type MovieDetailsUIStates = {
    /**
     * Whether the movie details are currently in editing mode.
     */
    isEditing: boolean;

    /**
     * Updates the {@link MovieDetailsUIStates.isEditing | `isEditing`} state.
     *
     * @example
     * ```tsx
     * setIsEditing(true); // enter edit mode
     * setIsEditing(prev => !prev); // toggle edit mode
     * ```
     */
    setIsEditing: Dispatch<SetStateAction<boolean>>;

    /**
     * Whether the movie poster update process (e.g., upload dialog) is currently active.
     */
    isUpdatingPoster: boolean;

    /**
     * Updates the {@link MovieDetailsUIStates.isUpdatingPoster | `isUpdatingPoster`} state.
     *
     * @example
     * ```tsx
     * setIsUpdatingPoster(true); // open poster upload dialog
     * ```
     */
    setIsUpdatingPoster: Dispatch<SetStateAction<boolean>>;

    /**
     * Whether a movie poster deletion operation is in progress.
     */
    isDeletingPoster: boolean;

    /**
     * Updates the {@link MovieDetailsUIStates.isDeletingPoster | `isDeletingPoster`} state.
     *
     * @example
     * ```tsx
     * setIsDeletingPoster(true); // show poster deletion confirmation
     * ```
     */
    setIsDeletingPoster: Dispatch<SetStateAction<boolean>>;

    /**
     * Whether the movie itself is currently being deleted.
     */
    isDeleting: boolean;

    /**
     * Updates the {@link MovieDetailsUIStates.isDeleting | `isDeleting`} state.
     *
     * @example
     * ```tsx
     * setIsDeleting(true); // disable interactions while deleting
     * ```
     */
    setIsDeleting: Dispatch<SetStateAction<boolean>>;
};

/**
 * React context for managing transient UI states within the movie details page.
 *
 * @remarks
 * This context provides a shared state for edit mode toggling,
 * poster update dialogs, and deletion actions — ensuring consistent UI behavior
 * across multiple components within the movie details view.
 *
 * A provider component must wrap parts of the app that consume this context,
 * typically initialized with `useState` hooks.
 *
 * @example
 * ```tsx
 * const [isEditing, setIsEditing] = useState(false);
 * const [isUpdatingPoster, setIsUpdatingPoster] = useState(false);
 * const [isDeletingPoster, setIsDeletingPoster] = useState(false);
 * const [isDeleting, setIsDeleting] = useState(false);
 *
 * <MovieDetailsUIContext.Provider value={{
 *   isEditing,
 *   setIsEditing,
 *   isUpdatingPoster,
 *   setIsUpdatingPoster,
 *   isDeletingPoster,
 *   setIsDeletingPoster,
 *   isDeleting,
 *   setIsDeleting,
 * }}>
 *   <MovieDetailsView />
 * </MovieDetailsUIContext.Provider>
 * ```
 */
export const MovieDetailsUIContext = createContext<MovieDetailsUIStates | undefined>(undefined);
