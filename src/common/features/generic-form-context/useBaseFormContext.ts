/**
 * @fileoverview Hook for accessing the base form context.
 */

import {BaseFormContext} from "@/common/features/generic-form-context/context.ts";
import {useContext} from "react";

/**
 * Returns the current base form context.
 * Requires wrapping in a BaseFormContext provider.
 */
export function useBaseFormContext() {
    const ctx = useContext(BaseFormContext);
    if (ctx === undefined) throw new Error("Must be used within a provider for the base form context.");
    return ctx;
}