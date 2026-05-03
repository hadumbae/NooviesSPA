/**
 * @fileoverview Provider for the seat details panel context, managing the state for viewing, editing, and deleting seats.
 */

import {ReactElement, ReactNode, useState} from "react";
import {SeatDetailsPanelContextValues, SeatPanelContext,} from "./SeatPanelContext.ts";

import {SeatDetails} from "@/domains/seats/schema/model";

/** Props for the SeatDetailsPanelContextProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/** Manages state for the seat details panel. */
export function SeatPanelContextProvider(
    {children}: ProviderProps
): ReactElement {
    const [seat, setSeat] = useState<SeatDetails | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

    const values: SeatDetailsPanelContextValues = {
        seat,
        setSeat,
        isPanelOpen,
        setIsPanelOpen,
    };

    return (
        <SeatPanelContext.Provider value={values}>
            {children}
        </SeatPanelContext.Provider>
    );
}