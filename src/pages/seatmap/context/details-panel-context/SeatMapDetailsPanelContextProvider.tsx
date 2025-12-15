import {ReactNode, useState} from "react";
import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {
    SeatMapDetailsPanelContext,
    SeatMapDetailsPanelContextValues,
} from "@/pages/seatmap/context/details-panel-context/SeatMapDetailsPanelContext.ts";

/**
 * @summary
 * Props for {@link SeatMapDetailsPanelContextProvider}.
 */
type ProviderProps = {
    /** Child components that consume the context */
    children: ReactNode;
};

/**
 * @summary
 * Context provider for the Seat Map details panel.
 *
 * @remarks
 * Manages selection, visibility, and edit state for the
 * seat map details panel in admin interfaces.
 */
const SeatMapDetailsPanelContextProvider = ({children}: ProviderProps) => {
    // --- State ---
    const [seatMap, setSeatMap] = useState<SeatMapDetails | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

    // --- Values ---
    const values: SeatMapDetailsPanelContextValues = {
        seatMap,
        setSeatMap,
        isEditing,
        setIsEditing,
        isPanelOpen,
        setIsPanelOpen,
    };

    // --- Render ---
    return (
        <SeatMapDetailsPanelContext.Provider value={values}>
            {children}
        </SeatMapDetailsPanelContext.Provider>
    );
};

export default SeatMapDetailsPanelContextProvider;
