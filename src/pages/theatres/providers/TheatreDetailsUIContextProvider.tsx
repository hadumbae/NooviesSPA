import {FC, PropsWithChildren, useState} from 'react';
import {GenreDetailsUIContext} from "@/pages/genres/context/GenreDetailsUIContext.ts";
import {TheatreDetailsUIStates} from "@/pages/theatres/context/TheatreDetailsUIContext.ts";

/**
 * Provider component for theatre details UI state.
 *
 * Manages flags and setters for editing, deleting, adding screens,
 * and adding showings. Wraps child components with the context so
 * they can access and update the theatre UI state.
 *
 * @example
 * <TheatreDetailsUIContextProvider>
 *   <TheatreDetailsComponent />
 * </TheatreDetailsUIContextProvider>
 */
const TheatreDetailsUIContextProvider: FC<PropsWithChildren> = ({children}) => {
    // Tracks whether the theatre details are in edit mode
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // Tracks whether a delete action is in progress
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    // Tracks whether a new screen is being added
    const [isAddingScreen, setIsAddingScreen] = useState<boolean>(false);

    // Tracks whether a new showing is being added
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
        <GenreDetailsUIContext.Provider value={context}>
            {children}
        </GenreDetailsUIContext.Provider>
    );
};

export default TheatreDetailsUIContextProvider;
