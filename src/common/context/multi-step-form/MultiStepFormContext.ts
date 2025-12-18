/**
 * @file MultiStepFormContext.ts
 *
 * Provides context and strongly typed utilities for managing multi-step
 * (wizard-style) forms in React.
 *
 * Designed to integrate with `react-hook-form`, this context exposes
 * step metadata, navigation helpers, hydration state, and reset utilities
 * for persisted or restored form values.
 *
 * Exposes:
 * - {@link MultiStepFormContextValues} — context value contract
 * - {@link MultiStepFormContext} — React context instance
 *
 * @example
 * ```ts
 * const { currentStep, changeStep } = useContext(MultiStepFormContext)!;
 * console.log(currentStep.title);
 * await changeStep(1);
 * ```
 */

import { FieldValues } from "react-hook-form";
import { FormStep } from "@/common/type/form/SteppedFormTypes.ts";
import { createContext } from "react";

/**
 * Contract for multi-step form navigation and state.
 *
 * @template TValues - Shape of form values managed by `react-hook-form`.
 *
 * @property initialValues - Restored or persisted form values, if available.
 * @property isHydrated - Indicates whether initial values have been restored.
 * @property currentStep - The currently active form step.
 * @property currentStepIndex - Index of the active step within `steps`.
 * @property isFirstStep - Returns `true` if the active step is the first step.
 * @property isLastStep - Returns `true` if the active step is the final step.
 * @property changeStep - Navigates between steps (`1` = forward, `-1` = backward).
 *                        May perform async validation before transitioning.
 * @property steps - Ordered list of all configured form steps.
 * @property resetForm - Resets step state and clears persisted or hydrated values.
 *
 * @example
 * ```ts
 * const ctx = useContext(MultiStepFormContext)!;
 * if (!ctx.isLastStep()) {
 *   await ctx.changeStep(1);
 * }
 * ```
 */
export type MultiStepFormContextValues<TValues extends FieldValues> = {
    initialValues: TValues | null;
    isHydrated: boolean;
    currentStep: FormStep<TValues>;
    currentStepIndex: number;
    isFirstStep: () => boolean;
    isLastStep: () => boolean;
    changeStep: (direction: 1 | -1) => Promise<void>;
    steps: FormStep<TValues>[];
    resetForm: () => void;
};

/**
 * React context holding state and helpers for multi-step form navigation.
 *
 * Components must be rendered within a `MultiStepFormProvider` to safely
 * consume this context.
 *
 * @example
 * ```ts
 * const multiStep = useContext(MultiStepFormContext);
 * if (!multiStep) {
 *   throw new Error("MultiStepFormContext must be used within a MultiStepFormProvider");
 * }
 *
 * console.log(multiStep.currentStep.title);
 * ```
 */
export const MultiStepFormContext = createContext<
    MultiStepFormContextValues<any> | undefined
>(undefined);
