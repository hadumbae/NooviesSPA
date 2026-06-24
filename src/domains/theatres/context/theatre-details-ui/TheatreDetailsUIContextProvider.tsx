/**
 * @fileoverview Provider component for theatre details UI state.
 */

import {ReactElement, ReactNode, useState} from 'react';
import {
    TheatreDetailsUIStateContext,
    TheatreDetailsUIStateValues
} from "@/domains/theatres/context/theatre-details-ui/TheatreDetailsUIStateContext.ts";
import {
    TheatreDetailsUISetterContext,
    TheatreDetailsUISetterValues
} from "@/domains/theatres/context/theatre-details-ui/TheatreDetailsUISetterContext.ts";

type ProviderProps = {
    children: ReactNode;
}

/** Provider component for theatre details UI state. */
export function TheatreDetailsUIContextProvider({children}: ProviderProps): ReactElement {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isAddingScreen, setIsAddingScreen] = useState<boolean>(false);
    const [isAddingShowing, setIsAddingShowing] = useState<boolean>(false);

    const stateValues: TheatreDetailsUIStateValues = {
        isEditing,
        isDeleting,
        isAddingScreen,
        isAddingShowing,
    };

    const setterValues: TheatreDetailsUISetterValues = {
        setIsEditing,
        setIsDeleting,
        setIsAddingScreen,
        setIsAddingShowing,
    };

    return (
        <TheatreDetailsUIStateContext.Provider value={stateValues}>
            <TheatreDetailsUISetterContext.Provider value={setterValues}>
                {children}
            </TheatreDetailsUISetterContext.Provider>
        </TheatreDetailsUIStateContext.Provider>
    );
}