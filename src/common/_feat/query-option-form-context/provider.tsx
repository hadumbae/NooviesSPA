/**
 * @fileoverview Provider component for the query option form context.
 */

import {ReactElement, ReactNode} from "react";
import {
    QueryOptionFormContext,
    QueryOptionFormContextValues
} from "@/common/_feat/query-option-form-context/context.ts";

/** Props for the QueryOptionFormContextProvider component. */
type ProviderProps = QueryOptionFormContextValues & {
    children: ReactNode;
};

/** Context provider that manages and distributes query option form state. */
export function QueryOptionFormContextProvider(
    {children, ...values}: ProviderProps
): ReactElement {
    return (
        <QueryOptionFormContext.Provider value={values}>
            {children}
        </QueryOptionFormContext.Provider>
    );
}