import { createContext, Dispatch, SetStateAction } from "react";

/**
 * Represents the UI state for a Person Details component.
 *
 * @remarks
 * - `isEditing` indicates if the person details form is currently in edit mode.
 * - `setIsEditing` is the React state setter function for `isEditing`.
 * - `isUpdatingProfileImage` indicates if the profile image update process is active.
 * - `setIsUpdatingProfileImage` is the React state setter function for `isUpdatingProfileImage`.
 */
export type PersonDetailsUIStates = {
    /** Whether the details form is in editing mode. */
    isEditing: boolean;
    /** Setter function for `isEditing`. */
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    /** Whether the profile image is being updated. */
    isUpdatingProfileImage: boolean;
    /** Setter function for `isUpdatingProfileImage`. */
    setIsUpdatingProfileImage: Dispatch<SetStateAction<boolean>>;
    /** Whether a deletion operation for the person is in progress. */
    isDeletingPerson: boolean;
    /** Setter function for `isDeletingPerson`. */
    setIsDeletingPerson: Dispatch<SetStateAction<boolean>>;
};

/**
 * React context for managing UI state in Person Details components.
 *
 * @remarks
 * - Provides state values and setters for editing and profile image updates.
 * - Initialized as `undefined` to enforce use within a proper context provider.
 * - Should be consumed with `useContext` or `useRequiredContext` for type safety.
 */
export const PersonDetailsUIContext = createContext<PersonDetailsUIStates | undefined>(undefined);
