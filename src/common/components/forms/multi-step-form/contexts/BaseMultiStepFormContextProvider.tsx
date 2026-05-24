/**
 * @fileoverview Provides the context provider for managing multi-step form state.
 */

import {ReactElement, ReactNode} from "react";
import {
    BaseMultiStepFormContext,
    BaseMultiStepFormContextValues
} from "@/common/_feat/multi-step-form/contexts/baseContext.ts";

/** Props for the BaseMultiStepFormContextProvider component. */
type ProviderProps = BaseMultiStepFormContextValues & {
    children: ReactNode;
};

/** Context provider that injects multi-step form values into the component tree. */
export function BaseMultiStepFormContextProvider(
    {children, ...values}: ProviderProps
): ReactElement {
    return (
        <BaseMultiStepFormContext.Provider value={values}>
            {children}
        </BaseMultiStepFormContext.Provider>
    );
}