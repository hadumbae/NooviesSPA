/**
 * @fileoverview Custom hook to access the base multi-step form context.
 */

import {useContext} from "react";
import {FieldValues} from "react-hook-form";
import {
    BaseMultiStepFormContext,
    BaseMultiStepFormContextValues
} from "@/common/_feat/multi-step-form/contexts/baseContext.ts";

/**
 * Accesses the multi-step form state and logic.
 * - Must be used within a BaseMultiStepFormContext provider.
 */
export function useBaseMultiStepFormContext<TForm extends FieldValues>(): BaseMultiStepFormContextValues<TForm> {
    const ctx = useContext(BaseMultiStepFormContext);

    if (ctx === undefined) {
        throw new Error("Must be used within a provider for the base multi step form context.");
    }

    return ctx;
}