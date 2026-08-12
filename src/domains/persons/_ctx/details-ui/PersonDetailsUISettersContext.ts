/**
 * @fileoverview React context for managing UI state setters in the person details view.
 */

import {createContext, Dispatch, SetStateAction} from "react";

/** State setter functions for controlling person details UI visibility and modes. */
export type PersonDetailsUISetters = {
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    setIsUpdatingProfileImage: Dispatch<SetStateAction<boolean>>;
    setIsDeletingPerson: Dispatch<SetStateAction<boolean>>;
};

/** Context object providing UI state setters for the person details domain. */
export const PersonDetailsUISettersContext = createContext<PersonDetailsUISetters | undefined>(undefined);
