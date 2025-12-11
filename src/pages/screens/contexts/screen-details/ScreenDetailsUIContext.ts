/**
 * @file TheatreScreenDetailsUIContext.ts
 * @summary
 * React context for managing UI state in the Theatre Screen Details page.
 *
 * @remarks
 * This context centralizes UI state such as edit mode and delete-warning modal
 * visibility. Components consuming this context should be wrapped in a provider
 * that supplies the corresponding setter functions.
 */

import {createContext, Dispatch, SetStateAction} from "react";

/**
 * Values exposed by `TheatreScreenDetailsUIContext`.
 *
 * @property isEditing - Whether the details page is currently in edit mode.
 * @property setIsEditing - Setter for `isEditing`.
 * @property showDeleteWarning - Whether the delete confirmation UI is visible.
 * @property setShowDeleteWarning - Setter for `showDeleteWarning`.
 */
export type ScreenDetailsUIContextValues = {
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    showDeleteWarning: boolean;
    setShowDeleteWarning: Dispatch<SetStateAction<boolean>>;
};

/**
 * React context providing UI state for theatre screen details.
 *
 * @description
 * Defaults to `undefined` so consumers can enforce provider usage with runtime
 * checks (e.g., via a custom `useRequiredContext` hook).
 */
export const ScreenDetailsUIContext =
    createContext<ScreenDetailsUIContextValues | undefined>(undefined);

ScreenDetailsUIContext.displayName = "ScreenDetailsUIContext";