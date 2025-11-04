import { FC, PropsWithChildren, useState } from 'react';
import { GenreDetailsUIContext, GenreDetailsUIStates } from "@/pages/genres/context/GenreDetailsUIContext.ts";

/**
 * Provides UI state context for the Genre Details section.
 *
 * @remarks
 * This provider wraps child components and supplies shared state
 * for edit and delete modes within a genre details view.
 *
 * It initializes the context defined in {@link GenreDetailsUIContext}
 * and exposes two boolean states — `isEditing` and `isDeleting` —
 * along with their corresponding setter functions.
 *
 * Components within this provider's tree can consume these values
 * using `useContext(GenreDetailsUIContext)`.
 *
 * @example
 * ```tsx
 * <GenreDetailsUIContextProvider>
 *   <GenreDetailsPanel />
 * </GenreDetailsUIContextProvider>
 * ```
 */
const GenreDetailsUIContextProvider: FC<PropsWithChildren> = ({ children }) => {
    /** Tracks whether the genre is currently being edited. */
    const [isEditing, setIsEditing] = useState<boolean>(false);

    /** Tracks whether the genre delete confirmation UI is active. */
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    /** Aggregated context state and update handlers. */
    const context: GenreDetailsUIStates = {
        isEditing,
        setIsEditing,
        isDeleting,
        setIsDeleting,
    };

    return (
        <GenreDetailsUIContext.Provider value={context}>
            {children}
        </GenreDetailsUIContext.Provider>
    );
};

export default GenreDetailsUIContextProvider;
