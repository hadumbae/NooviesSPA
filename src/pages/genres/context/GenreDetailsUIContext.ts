import { createContext, Dispatch, SetStateAction } from "react";

/**
 * Represents the UI state handlers for the Genre Details view.
 *
 * @remarks
 * This type defines reactive UI flags and their corresponding setter functions
 * for managing edit and delete modes within a genre details component.
 *
 * Typically used in combination with {@link GenreDetailsUIContext} to share state
 * across nested components without prop drilling.
 *
 * @property isEditing - Indicates whether the genre is currently in edit mode.
 * @property setIsEditing - Updates the {@link isEditing} state.
 * @property isDeleting - Indicates whether the delete confirmation UI is active.
 * @property setIsDeleting - Updates the {@link isDeleting} state.
 */
export type GenreDetailsUIStates = {
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    isDeleting: boolean;
    setIsDeleting: Dispatch<SetStateAction<boolean>>;
}

/**
 * React context for managing and providing UI state
 * within the Genre Details section.
 *
 * @remarks
 * Provides access to editing and deleting state controls
 * across child components of the genre details view.
 *
 * Must be used within a corresponding `GenreDetailsUIProvider`
 * that initializes the context values.
 *
 * @example
 * ```tsx
 * const ui = useContext(GenreDetailsUIContext);
 * if (!ui) throw new Error("GenreDetailsUIContext not found");
 *
 * return (
 *   <Button onClick={() => ui.setIsEditing(true)}>Edit</Button>
 * );
 * ```
 */
export const GenreDetailsUIContext = createContext<GenreDetailsUIStates | undefined>(undefined);
