/**
 * @fileoverview Context definition for managing UI interaction states within the person details view.
 */

import {createContext} from "react";

/** UI state flags for the person details management interface. */
export type PersonDetailsUIStates = {
    isEditing: boolean;
    isUpdatingProfileImage: boolean;
    isDeletingPerson: boolean;
};

/** React context holding the current UI states for person details. */
export const PersonDetailsUIStatesContext = createContext<PersonDetailsUIStates | undefined>(undefined);
