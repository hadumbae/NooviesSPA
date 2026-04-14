/**
 * @fileoverview Provider component for the BaseFormContext.
 * Facilitates the distribution of form metadata to nested sub-components.
 */

import {ReactElement, ReactNode} from "react";
import {BaseFormContext, BaseFormContextValues} from "@/common/features/generic-form-context/context.ts";

/** Props for the {@link BaseFormContextProvider} component. */
type ProviderProps = BaseFormContextValues & {
    children: ReactNode;
};

/**
 * Provides basic form state and identification to its descendants.
 */
export function BaseFormContextProvider(
    {children, ...values}: ProviderProps
): ReactElement {
    return (
        <BaseFormContext.Provider value={values}>
            {children}
        </BaseFormContext.Provider>
    );
}