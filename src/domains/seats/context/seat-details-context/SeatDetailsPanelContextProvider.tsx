/**
 * @fileoverview Provider for the seat details panel context, managing the state for viewing, editing, and deleting seats.
 */

import {ReactElement, ReactNode, useState} from "react";
import {
    SeatDetailsPanelContext,
    SeatDetailsPanelContextValues,
} from "@/domains/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import {Seat} from "@/domains/seats/schema/seat/Seat.types.ts";

/** Props for the SeatDetailsPanelContextProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/**
 * Manages the global-local state for the seat interaction panel, allowing disparate components
 * to trigger panel visibility, enter edit modes, or initiate deletion workflows.
 */
export function SeatDetailsPanelContextProvider(
    {children}: ProviderProps
): ReactElement {
    const [seat, setSeat] = useState<Seat | null>(null);
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
}