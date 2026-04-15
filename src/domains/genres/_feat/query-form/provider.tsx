/**
 * @fileoverview Provider component for the GenreQueryOptionFormContext.
 * Distributes form identification and submission logic to nested filter components.
 */

import {ReactElement, ReactNode} from "react";
import {SubmitHandler} from "react-hook-form";
import {GenreQueryOptionFormStarter} from "@/domains/genres/_feat/query-form/schema.ts";
import {
    GenreQueryOptionFormContext,
    GenreQueryOptionFormContextValues
} from "@/domains/genres/_feat/query-form/context.ts";

/** Props for the {@link GenreQueryOptionFormContextProvider} component. */
type ProviderProps = {
    children?: ReactNode;
    formID: string;
    submitHandler: SubmitHandler<GenreQueryOptionFormStarter>;
};

/**
 * Provides Genre-specific filter form state to its descendants.
 */
export function GenreQueryOptionFormContextProvider(
    {children, formID, submitHandler}: ProviderProps
): ReactElement {
    const values: GenreQueryOptionFormContextValues = {
        formID,
        submitHandler,
    };

    return (
        <GenreQueryOptionFormContext.Provider value={values}>
            {children}
        </GenreQueryOptionFormContext.Provider>
    );
}