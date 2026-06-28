/**
 * @fileoverview Context provider for managing the UI state of the showing details view.
 */

import {ReactElement, ReactNode, useState} from "react";
import {
    ShowingDetailsUISetterContext, ShowingDetailsUISetterContextValues,
    ShowingDetailsUIStateContext,
    ShowingDetailsUIStateContextValues
} from "@/domains/showings/_ctx";

/** Props for the ShowingDetailsUIContextProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/**
 * Provides state and setter contexts for showing details UI interactions.
 */
export function ShowingDetailsUIContextProvider(
    {children}: ProviderProps
): ReactElement {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const stateValues: ShowingDetailsUIStateContextValues = {isDeleting};
    const setterValues: ShowingDetailsUISetterContextValues = {setIsDeleting};

    return (
        <ShowingDetailsUIStateContext.Provider value={stateValues}>
            <ShowingDetailsUISetterContext.Provider value={setterValues}>
                {children}
            </ShowingDetailsUISetterContext.Provider>
        </ShowingDetailsUIStateContext.Provider>
    );
}