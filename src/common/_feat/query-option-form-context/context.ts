/**
 * @fileoverview Provides a context for managing form state and submission within query option filters.
 */

import {createContext} from "react";
import {SubmitHandler} from "react-hook-form";

/** Values provided by the QueryOptionFormContext for form synchronisation. */
export type QueryOptionFormContextValues = {
    formID: string;
    submitHandler: SubmitHandler<any>;
    resetValues: () => void;
    activeOptions: number
};

/** Context for sharing react-hook-form state and submission logic across filter components. */
export const QueryOptionFormContext = createContext<QueryOptionFormContextValues | null>(null);

QueryOptionFormContext.displayName = "QueryOptionFormContext";