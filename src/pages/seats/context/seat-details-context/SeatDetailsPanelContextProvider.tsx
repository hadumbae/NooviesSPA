/**
 * @file SeatEditFormContextProvider
 * @description
 * Implements the React context provider responsible for managing the detailed
 * editing state of a seat within the seat-management UI.
 *
 * This provider stores:
 * - The currently selected seat being edited.
 * - Whether the seat-details panel is open.
 * - Whether the panel is in editing mode.
 * - Whether the delete-warning dialog is displayed.
 * - Setters for all of the above.
 *
 * Components wrapped by this provider gain access to seat-details editing
 * state through {@link SeatDetailsPanelContext}.
 */

import { FC, PropsWithChildren, useState } from "react";
import {
    SeatDetailsPanelContext,
    SeatDetailsPanelContextValues,
} from "@/pages/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";

/**
 * React provider component that supplies seat-details editing state to its
 * descendant components.
 *
 * This includes:
 * - `seat`: the currently selected seat's full details
 * - `isPanelOpen`: visibility of the seat-details side panel
 * - `isEditing`: whether the panel is in editing mode
 * - `showDeleteWarning`: whether the delete confirmation dialog is visible
 * - Setter functions for each state value
 *
 * @param children
 * React child nodes that will receive access to the seat-details editing state.
 *
 * @example
 * ```tsx
 * <SeatEditFormContextProvider>
 *   <SeatList />
 *   <SeatDetailsPanel />
 * </SeatEditFormContextProvider>
 * ```
 *
 * @returns A context provider that supplies {@link SeatDetailsPanelContextValues}
 * to all child components via {@link SeatDetailsPanelContext}.
 */
const SeatDetailsPanelContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [seat, setSeat] = useState<SeatDetails | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);

    const values: SeatDetailsPanelContextValues = {
        seat,
        setSeat,
        isPanelOpen,
        setIsPanelOpen,
        isEditing,
        setIsEditing,
        showDeleteWarning,
        setShowDeleteWarning,
    };

    return (
        <SeatDetailsPanelContext.Provider value={values}>
            {children}
        </SeatDetailsPanelContext.Provider>
    );
};

export default SeatDetailsPanelContextProvider;
