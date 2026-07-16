/**
 * @fileoverview Hook for accessing the multi-step form state context.
 */

import {useContext} from "react";
import {FieldValues} from "react-hook-form";
import {
    MultiStepFormStateContext,
    MultiStepFormStateContextValues
} from "@/common/_feat/multi-step-form/contexts/stateContext.ts";

/**
 * Accesses the MultiStepFormStateContext.
 */
export function useMultiStepFormContext<TValues extends FieldValues>() {
    const ctx = useContext(MultiStepFormStateContext) as MultiStepFormStateContextValues<TValues> | undefined;

    if (ctx === undefined) {
        throw new Error("Multi-Step Form Context missing. Please use within provider.");
    }

    return ctx;
}
