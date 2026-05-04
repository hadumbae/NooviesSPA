/**
 * @fileoverview Provider component for the screen details UI state and setter contexts.
 */

import {ReactElement, ReactNode, useState} from "react";
import {ScreenDetailsUIStateContext, ScreenDetailsUIStateContextValues} from "./ScreenDetailsUIStateContext.ts";
import {
    ScreenDetailsUISetterContext,
    ScreenDetailsUISetterContextValues
} from "@/domains/theatre-screens/contexts/screen-details/ScreenDetailsUISetterContext.ts";

/** Props for the ScreenDetailsUIContextProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/** Provides the screen details UI state and setter functions to child components. */
export function ScreenDetailsUIContextProvider({children}: ProviderProps): ReactElement {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);

    const stateValues: ScreenDetailsUIStateContextValues = {
        isEditing,
        showDeleteWarning,
    };

    const setterValues: ScreenDetailsUISetterContextValues = {
        setIsEditing,
        setShowDeleteWarning,
    };

    return (
        <ScreenDetailsUIStateContext.Provider value={stateValues}>
            <ScreenDetailsUISetterContext.Provider value={setterValues}>
                {children}
            </ScreenDetailsUISetterContext.Provider>
        </ScreenDetailsUIStateContext.Provider>
    );
}