/**
 * @file useMultiStepFormContext.ts
 * @description
 * Custom React hook to access the multi-step form context with proper typing.
 *
 * Ensures type-safe access to the `MultiStepFormContextValues` for the current
 * form step, navigation methods, and step state.
 *
 * @example
 * ```ts
 * const { currentStep, nextStep } = useMultiStepFormContext<MyFormValues>();
 * console.log(currentStep.title);
 * await nextStep();
 * ```
 */

import {useContext} from "react";
import {FieldValues} from "react-hook-form";
import {
    MultiStepFormContext,
    MultiStepFormContextValues
} from "@/common/context/multi-step-form/MultiStepFormContext.ts";

/**
 * Hook to access the multi-step form context.
 *
 * @template TValues - The type of form values, usually inferred from `react-hook-form`.
 *
 * @throws Will throw an error if the hook is used outside a `MultiStepFormProvider`.
 *
 * @returns The strongly-typed multi-step form context object.
 *
 * @example
 * ```ts
 * const multiStepForm = useMultiStepFormContext<MyFormValues>();
 * console.log(multiStepForm.currentStep.title);
 * ```
 */
export default function useMultiStepFormContext<TValues extends FieldValues>() {
    const ctx = useContext(MultiStepFormContext) as MultiStepFormContextValues<TValues> | undefined;

    if (ctx === undefined) {
        throw new Error("Multi-Step Form Context missing. Please use within provider.");
    }

    return ctx;
}
