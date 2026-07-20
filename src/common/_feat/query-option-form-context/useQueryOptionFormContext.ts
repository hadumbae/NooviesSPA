/**
 * @fileoverview Custom hook for accessing the query option form context.
 */

import {useContext} from "react";
import {QueryOptionFormContext} from "@/common/_feat/query-option-form-context/context.ts";

/**
 * Returns the current query option form context.
 * Must be used within a QueryOptionFormContext provider.
 */
export function useQueryOptionFormContext() {
    const ctx = useContext(QueryOptionFormContext);

    if (ctx === null) {
        throw new Error(`Must be used within a provider for the "${QueryOptionFormContext.displayName}" context.`);
    }

    return ctx;
}