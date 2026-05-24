/**
 * @fileoverview Hook for accessing the multi-step form configuration and state context.
 *
 */

import {useContext} from "react";
import {
    MultiStepFormStateContext,
    MultiStepFormStateContextValues
} from "@/common/_feat/multi-step-form/contexts/stateContext.ts";
import {FieldValues} from "react-hook-form";

/**
 * Retrieves the multi-step form context values.
 * - Must be used within a MultiStepFormConfigContext provider.
 */
export function useMultiStepFormStateContext<TValues extends FieldValues>(): MultiStepFormStateContextValues<TValues> {
    const ctx = useContext(MultiStepFormStateContext);

    if (ctx === undefined) {
        throw new Error("Must be used within a provider for the multi step form state context.");
    }

    return ctx;
}