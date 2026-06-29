/**
 * @fileoverview Provider component that manages and distributes UI state for the person details view.
 */

import {FC, PropsWithChildren, useState} from 'react';
import {
    PersonDetailsUIStates,
    PersonDetailsUIStatesContext
} from "@/domains/persons/_ctx/PersonDetailsUIStatesContext.ts";
import {
    PersonDetailsUISetters,
    PersonDetailsUISettersContext
} from "@/domains/persons/_ctx/PersonDetailsUISettersContext.ts";

/**
 * Manages local UI states for editing, profile image updates, and person deletion.
 */
export const PersonDetailsUIProvider: FC<PropsWithChildren> = ({children}) => {
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
};
