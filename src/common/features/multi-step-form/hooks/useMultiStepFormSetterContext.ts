/**
 * @fileoverview Hook for accessing the setter context of a multi-step form.
 */

import {useContext} from "react";
import {
    MultiStepFormSetterContext,
    MultiStepFormSetterContextValues
} from "@/common/features/multi-step-form/contexts/setterContext.ts";

/**
 * Accesses the multi-step form setter context.
 * - Must be used within a MultiStepFormSetterContext provider.
 */
export function useMultiStepFormSetterContext(): MultiStepFormSetterContextValues {
    const ctx = useContext(MultiStepFormSetterContext);

    if (ctx === undefined) {
        throw new Error("Must be used within a provider for the multi step form state context.");
    }

    return ctx;
}