/**
 * @fileoverview Provider for the seat details panel context, managing the state for viewing, editing, and deleting seats.
 */

import {ReactElement, ReactNode, useMemo, useState} from "react";
import {SeatDetails} from "@/domains/seats/_schema";
import {
    SeatPanelStateContext,
    SeatPanelStateContextValues,
} from "@/domains/seats/_feat/seat-details-context/context/SeatPanelStateContext.ts";
import {
    SeatPanelSetterContext,
    SeatPanelSetterContextValues,
} from "@/domains/seats/_feat/seat-details-context/context/SeatPanelSetterContext.ts";

/** Props for the SeatDetailsPanelContextProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/** Manages state and setter functions for the seat details panel. */
export function SeatPanelContextProvider(
    {children}: ProviderProps
): ReactElement {
    const [seat, setSeat] = useState<SeatDetails | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

    const stateValues: SeatPanelStateContextValues = useMemo(() => ({
        seat,
        isPanelOpen,
    }), [seat, isPanelOpen]);

    const setterValues: SeatPanelSetterContextValues = useMemo(() => ({
        setSeat,
        setIsPanelOpen,
    }), []);

    return (
        <SeatPanelStateContext.Provider value={stateValues}>
            <SeatPanelSetterContext.Provider value={setterValues}>
                {children}
            </SeatPanelSetterContext.Provider>
        </SeatPanelStateContext.Provider>
    );
}