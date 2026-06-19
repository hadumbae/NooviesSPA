/**
 * @fileoverview Provider for the Genre Details UI state context.
 */

import {ReactElement, ReactNode, useState} from 'react';
import {
    GenreDetailsUIStateContext,
    GenreDetailsUIStateContextValues
} from "@/domains/genres/_feat/page-context/genre-details-ui-control/GenreDetailsUIStateContext.ts";
import {
    GenreDetailsUISetterContext,
    GenreDetailsUISetterContextValues
} from "@/domains/genres/_feat/page-context/genre-details-ui-control/GenreDetailsUISetterContext.ts";

/** Props for the GenreDetailsUIContextProvider component. */
type ProviderProps = {
    children?: ReactNode;
}

/**
 * Provides shared UI state for editing, deleting, and image management within the genre details view.
 */
export function GenreDetailsUIContextProvider({children}: ProviderProps): ReactElement {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isUpdatingImage, setIsUpdatingImage] = useState<boolean>(false);
    const [isRemovingImage, setIsRemovingImage] = useState<boolean>(false);

    const stateValues: GenreDetailsUIStateContextValues = {
        isEditing,
        isDeleting,
        isUpdatingImage,
        isRemovingImage,
    };

    const setterValues: GenreDetailsUISetterContextValues = {
        setIsEditing,
        setIsDeleting,
        setIsUpdatingImage,
        setIsRemovingImage,
    };

    return (
        <GenreDetailsUIStateContext.Provider value={stateValues}>
            <GenreDetailsUISetterContext.Provider value={setterValues}>
                {children}
            </GenreDetailsUISetterContext.Provider>
        </GenreDetailsUIStateContext.Provider>
    );
}
