/**
 * @fileoverview Provider component that manages pending UI states for genre detail actions.
 */
import {ReactElement, ReactNode, useState} from 'react';
import {
    GenreDetailsUIPendingStateContext,
    GenreDetailsUIPendingStateContextValues
} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIPendingStateContext.ts";
import {
    GenreDetailsUIPendingSetterContext,
    GenreDetailsUIPendingSetterContextValues
} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIPendingSetterContext.ts";

/** Props for the GenreDetailsUIPendingContextProvider component. */
type ProviderProps = {
    children?: ReactNode;
}

/** Provides state and setter contexts for tracking pending operations in the genre details UI. */
export function GenreDetailsUIPendingContextProvider({children}: ProviderProps): ReactElement {
    const [isGenreEditing, setIsGenreEditing] = useState<boolean>(false);
    const [isGenreDeleting, setIsGenreDeleting] = useState<boolean>(false);
    const [isImageUpdatePending, setIsImageUpdatePending] = useState<boolean>(false);
    const [isImageRemovalPending, setIsImageRemovalPending] = useState<boolean>(false);

    const stateValues: GenreDetailsUIPendingStateContextValues = {
        isGenreEditing,
        isGenreDeleting,
        isImageUpdatePending,
        isImageRemovalPending,
    };

    const setterValues: GenreDetailsUIPendingSetterContextValues = {
        setIsGenreEditing,
        setIsGenreDeleting,
        setIsImageUpdatePending,
        setIsImageRemovalPending,
    };

    return (
        <GenreDetailsUIPendingStateContext.Provider value={stateValues}>
            <GenreDetailsUIPendingSetterContext.Provider value={setterValues}>
                {children}
            </GenreDetailsUIPendingSetterContext.Provider>
        </GenreDetailsUIPendingStateContext.Provider>
    );
}
