import { createContext, Dispatch, SetStateAction } from "react";

/**
 * Represents the UI state and control setters for the movie details view.
 *
 * This context centralizes transient UI states related to editing,
 * poster updates, and deletion actions within the movie details page.
 * Components consuming this context can both read and update these states.
 */
export type MovieDetailsUIStates = {
    /**
     * Indicates whether the movie details are currently in editing mode.
     */
    isEditing: boolean;

    /**
     * Setter for {@link MovieDetailsUIStates.isEditing | `isEditing`}.
     * Use this to toggle or explicitly set the editing state.
     */
    setIsEditing: Dispatch<SetStateAction<boolean>>;

    /**
     * Indicates whether the movie poster update process is active.
     */
    isUpdatingPoster: boolean;

    /**
     * Setter for {@link MovieDetailsUIStates.isUpdatingPoster | `isUpdatingPoster`}.
     * Typically used to show or hide poster update UI elements.
     */
    setIsUpdatingPoster: Dispatch<SetStateAction<boolean>>;

    /**
     * Indicates whether the movie is currently being deleted.
     */
    isDeleting: boolean;

    /**
     * Setter for {@link MovieDetailsUIStates.isDeleting | `isDeleting`}.
     * Use this to manage confirmation dialogs or disable interactions during deletion.
     */
    setIsDeleting: Dispatch<SetStateAction<boolean>>;
};

/**
 * React context for managing UI state in the movie details page.
 *
 * Provides control over edit mode, poster update dialogs, and deletion states.
 *
 * @remarks
 * This context should be wrapped by a provider component that initializes and manages
 * its internal state with React hooks such as `useState`.
 *
 * @example
 * ```tsx
 * const [isEditing, setIsEditing] = useState(false);
 * const [isUpdatingPoster, setIsUpdatingPoster] = useState(false);
 * const [isDeleting, setIsDeleting] = useState(false);
 *
 * <MovieDetailsUIContext.Provider value={{
 *   isEditing,
 *   setIsEditing,
 *   isUpdatingPoster,
 *   setIsUpdatingPoster,
 *   isDeleting,
 *   setIsDeleting,
 * }}>
 *   <MovieDetailsView />
 * </MovieDetailsUIContext.Provider>
 * ```
 */
export const MovieDetailsUIContext = createContext<MovieDetailsUIStates | undefined>(undefined);
