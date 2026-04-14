/**
 * @fileoverview Provider component for the Genre form context.
 * Facilitates the sharing of form metadata and behavioral configuration across the Genre domain.
 */

import {ReactElement, ReactNode} from "react";
import {GenreFormContext, GenreFormContextValues} from "@/domains/genres/_feat/submit-form/context.ts";

type ProviderProps = GenreFormContextValues & {
    /** The content to be wrapped by the provider. */
    children: ReactNode;
};

/**
 * Context Provider that broadcasts form state (like formID and isPending)
 * to nested Genre form inputs and submission components.
 */
export function GenreFormContextProvider(
    {children, ...values}: ProviderProps
): ReactElement {
    return (
        <GenreFormContext.Provider value={values}>
            {children}
        </GenreFormContext.Provider>
    );
}