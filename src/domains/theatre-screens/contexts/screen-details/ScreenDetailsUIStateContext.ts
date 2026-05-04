/**
 * @fileoverview React context for managing UI state in the Theatre Screen Details page.
 */

import {createContext} from "react";

/** Values exposed by the screen details UI state context. */
export type ScreenDetailsUIStateContextValues = {
    isEditing: boolean;
    showDeleteWarning: boolean;
};

/** React context providing UI state for theatre screen details. */
export const ScreenDetailsUIStateContext =
    createContext<ScreenDetailsUIStateContextValues | undefined>(undefined);

ScreenDetailsUIStateContext.displayName = "ScreenDetailsUIStateContext";