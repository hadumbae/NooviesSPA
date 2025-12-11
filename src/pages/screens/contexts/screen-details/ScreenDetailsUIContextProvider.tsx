/**
 * @file ScreenDetailsUIContextProvider.tsx
 * @summary
 * React context provider for managing UI state in the Screen Details page.
 *
 * @description
 * Centralizes UI state for screen detail management workflows:
 * - `isEditing`: whether the screen details page is in edit mode
 * - `showDeleteWarning`: whether the delete confirmation modal is visible
 *
 * Components wrapped by this provider can access the shared UI state
 * through {@link ScreenDetailsUIContext}.
 */

import { ReactNode, useState } from "react";
import { ScreenDetailsUIContext, ScreenDetailsUIContextValues } from "@/pages/screens/contexts/screen-details/ScreenDetailsUIContext.ts";

type ProviderProps = {
    /** React children to render inside the provider */
    children: ReactNode;
};

/**
 * Provides {@link ScreenDetailsUIContext} to child components.
 *
 * @param props - Contains React children.
 * @returns A context provider exposing UI state for the screen details page.
 *
 * @example
 * ```tsx
 * <ScreenDetailsUIContextProvider>
 *   <ScreenDetailsPanel />
 * </ScreenDetailsUIContextProvider>
 * ```
 */
const ScreenDetailsUIContextProvider = ({ children }: ProviderProps) => {
    // --- State ---
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);

    // --- Aggregated Context Value ---
    const values: ScreenDetailsUIContextValues = {
        isEditing,
        setIsEditing,
        showDeleteWarning,
        setShowDeleteWarning,
    };

    // --- Render ---
    return (
        <ScreenDetailsUIContext.Provider value={values}>
            {children}
        </ScreenDetailsUIContext.Provider>
    );
};

export default ScreenDetailsUIContextProvider;
