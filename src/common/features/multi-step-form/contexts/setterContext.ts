/**
 * @fileoverview Context definition for managing state transitions and form actions in a multi-step form.
 */

import {createContext} from "react";

/** Operations and state checkers for controlling multi-step form navigation and submission. */
export type MultiStepFormSetterContextValues = {
    isFirstStep: () => boolean;
    isLastStep: () => boolean;
    changeStep: (direction: 1 | -1) => Promise<void>;
    resetForm: () => void;
};

/** Context provider for multi-step form control functions. */
export const MultiStepFormSetterContext = createContext<
    MultiStepFormSetterContextValues | undefined
>(undefined);
