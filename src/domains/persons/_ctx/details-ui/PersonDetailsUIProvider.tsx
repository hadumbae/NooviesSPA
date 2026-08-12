/**
 * @fileoverview Provider component that manages and distributes UI state for the person details view.
 */

import {ReactElement, ReactNode, useState} from 'react';
import {
    PersonDetailsUIStates,
    PersonDetailsUIStatesContext
} from "@/domains/persons/_ctx/details-ui/PersonDetailsUIStatesContext.ts";
import {
    PersonDetailsUISetters,
    PersonDetailsUISettersContext
} from "@/domains/persons/_ctx/details-ui/PersonDetailsUISettersContext.ts";

type ProviderProps = {
    children: ReactNode;
}

/**
 * Manages local UI states for editing, profile image updates, and person deletion.
 */
export function PersonDetailsUIProvider(
    {children}: ProviderProps
): ReactElement {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isUpdatingProfileImage, setIsUpdatingProfileImage] = useState<boolean>(false);
    const [isDeletingPerson, setIsDeletingPerson] = useState<boolean>(false);

    const states: PersonDetailsUIStates = {
        isEditing,
        isUpdatingProfileImage,
        isDeletingPerson,
    };

    const setters: PersonDetailsUISetters = {
        setIsEditing,
        setIsUpdatingProfileImage,
        setIsDeletingPerson,
    };

    return (
        <PersonDetailsUIStatesContext.Provider value={states}>
            <PersonDetailsUISettersContext.Provider value={setters}>
                {children}
            </PersonDetailsUISettersContext.Provider>
        </PersonDetailsUIStatesContext.Provider>
    );
}
