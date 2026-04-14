/**
 * @fileoverview Shared context for form-related state and identification.
 */

import {createContext} from "react";

/** Shared values for form synchronization across nested components. */
export type BaseFormContextValues = {
    formID: string;
    isPending?: boolean;
};

/**
 * Context for providing basic form metadata to child components.
 */
export const BaseFormContext = createContext<BaseFormContextValues | undefined>(undefined);