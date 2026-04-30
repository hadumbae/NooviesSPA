/**
 * @fileoverview Provider component for theatre details UI state.
 */

import {ReactElement, ReactNode, useState} from 'react';
import {
    TheatreDetailsUIContext,
    TheatreDetailsUIStates
} from "@/domains/theatres/context/theatre-details-ui/TheatreDetailsUIContext.ts";

type ProviderProps = {
    children: ReactNode;
}

/** Provider component for theatre details UI state. */
export function TheatreDetailsUIContextProvider({children}: ProviderProps): ReactElement {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isAddingScreen, setIsAddingScreen] = useState<boolean>(false);
    const [isAddingShowing, setIsAddingShowing] = useState<boolean>(false);

    const context: TheatreDetailsUIStates = {
        isEditing,
        setIsEditing,
        isDeleting,
        setIsDeleting,
        isAddingScreen,
        setIsAddingScreen,
        isAddingShowing,
        setIsAddingShowing,
    };

    return (
        <TheatreDetailsUIContext.Provider value={context}>
            {children}
        </TheatreDetailsUIContext.Provider>
    );
}