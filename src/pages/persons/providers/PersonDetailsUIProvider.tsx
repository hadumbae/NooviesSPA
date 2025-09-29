import { FC, PropsWithChildren, useState } from 'react';
import { PersonDetailsUIContext, PersonDetailsUIStates } from "@/pages/persons/context/PersonDetailsUIContext.ts";

/**
 * React context provider for managing the UI state of Person Details components.
 *
 * @remarks
 * This provider supplies state values and setters for key UI interactions:
 * - `isEditing` / `setIsEditing` — whether the details form is in edit mode.
 * - `isUpdatingProfileImage` / `setIsUpdatingProfileImage` — whether the profile image update is active.
 * - `isDeletingPerson` / `setIsDeletingPerson` — whether a person deletion process is active.
 *
 * Components that consume this context can react to these state changes to show
 * modals, forms, or other UI elements related to person details.
 *
 * Wrap any components that need access to person details UI state with this provider.
 * Use `useContext` or `useRequiredContext` to safely access the context values.
 *
 * @example
 * ```tsx
 * <PersonDetailsUIProvider>
 *   <PersonDetailsForm />
 *   <PersonProfileImageEditor />
 * </PersonDetailsUIProvider>
 * ```
 */
const PersonDetailsUIProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isUpdatingProfileImage, setIsUpdatingProfileImage] = useState<boolean>(false);
    const [isDeletingPerson, setIsDeletingPerson] = useState<boolean>(false);

    const values: PersonDetailsUIStates = {
        isEditing,
        setIsEditing,
        isUpdatingProfileImage,
        setIsUpdatingProfileImage,
        isDeletingPerson,
        setIsDeletingPerson,
    };

    return (
        <PersonDetailsUIContext.Provider value={values}>
            {children}
        </PersonDetailsUIContext.Provider>
    );
};

export default PersonDetailsUIProvider;
