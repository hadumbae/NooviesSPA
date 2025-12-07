/**
 * @file SeatDetailsPanelContext
 * @description
 * Provides React context definitions for managing the detailed editing state
 * of a seat within the seat management UI.
 *
 * This context exposes:
 * - The currently selected seat (full details) for editing.
 * - Setters for updating the selected seat.
 * - Visibility state of the seat-details panel.
 * - Editing mode state.
 * - Delete-warning dialog state.
 *
 * Intended for use by components that display or edit detailed seat information.
 */

import { createContext, Dispatch, SetStateAction } from "react";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";

/**
 * Values stored in {@link SeatDetailsPanelContext}.
 *
 * @property seat The currently selected seat’s detailed information, or `null`
 *           when no seat is selected.
 * @property setSeat Setter used to update the `seat` value.
 *
 * @property isPanelOpen Whether the seat-details panel is visible.
 * @property setIsPanelOpen Setter for toggling the panel’s open/closed state.
 *
 * @property isEditing Whether the panel is currently in "editing mode".
 * @property setIsEditing Setter used to toggle `isEditing`.
 *
 * @property showDeleteWarning Whether the delete-warning confirmation dialog
 *           is visible.
 * @property setShowDeleteWarning Setter used to toggle `showDeleteWarning`.
 */
export type SeatDetailsPanelContextValues = {
    /** The detailed seat currently being edited, or `null` if none is selected. */
    seat: SeatDetails | null;

    /** Updates the current detailed seat. */
    setSeat: Dispatch<SetStateAction<SeatDetails | null>>;

    /** Whether the seat-details side panel is visible. */
    isPanelOpen: boolean;

    /** Toggles the seat-details panel open/closed state. */
    setIsPanelOpen: Dispatch<SetStateAction<boolean>>;

    /** Whether the form is currently in editing mode. */
    isEditing: boolean;

    /** Toggles editing mode for the seat-details form. */
    setIsEditing: Dispatch<SetStateAction<boolean>>;

    /** Whether the delete warning confirmation dialog is shown. */
    showDeleteWarning: boolean;

    /** Toggles visibility of the delete warning dialog. */
    setShowDeleteWarning: Dispatch<SetStateAction<boolean>>;
};

/**
 * React context providing seat-details editing state and control functions.
 *
 * Components consuming this context must be wrapped in a provider that supplies
 * all required values.
 *
 * @example
 * ```tsx
 * <SeatDetailsPanelContext.Provider
 *   value={{
 *     seat,
 *     setSeat,
 *     isPanelOpen,
 *     setIsPanelOpen,
 *     isEditing,
 *     setIsEditing,
 *     showDeleteWarning,
 *     setShowDeleteWarning
 *   }}
 * >
 *   <SeatDetailsPanel />
 * </SeatDetailsPanelContext.Provider>
 * ```
 */
export const SeatDetailsPanelContext =
    createContext<SeatDetailsPanelContextValues | undefined>(undefined);
