/**
 * @file MultiStepFormContext.ts
 * @description
 * Provides context and strongly-typed utilities for managing multi-step (wizard-style)
 * forms in React. Designed to work with `react-hook-form` while supporting validation,
 * step transitions, and step metadata.
 *
 * Exposes:
 * - `MultiStepFormContextValues`: Context value contract for consumers
 * - `MultiStepFormContext`: React context instance for multi-step form state
 *
 * @example
 * ```ts
 * const { currentStep, changeStep } = useContext(MultiStepFormContext)!;
 * console.log(currentStep.title);
 * await changeStep(1); // go forward
 * ```
 */

import { FieldValues } from "react-hook-form";
import { FormStep } from "@/common/type/form/SteppedFormTypes.ts";
import { createContext } from "react";

/**
 * Represents the contract for multi-step form navigation and state.
 *
 * @template TValues - The shape of form values handled by react-hook-form.
 *
 * @property isHydrated - Indicates whether stored values or saved state have been restored.
 * @property currentStep - The actively displayed step.
 * @property currentStepIndex - Index of the active step in the steps array.
 * @property isFirstStep - Returns `true` if the current step is the first step.
 * @property isLastStep - Returns `true` if the current step is the final step.
 * @property changeStep - Moves the form forward (`1`) or backward (`-1`). Accepts async validation.
 * @property steps - Full ordered list of all form steps.
 *
 * @example
 * ```ts
 * const ctx = useContext(MultiStepFormContext)!;
 * if (!ctx.isLastStep()) await ctx.changeStep(1);
 * ```
 */
export type MultiStepFormContextValues<TValues extends FieldValues> = {
    isHydrated: boolean;
    currentStep: FormStep<TValues>;
    currentStepIndex: number;
    isFirstStep: () => boolean;
    isLastStep: () => boolean;
    changeStep: (direction: 1 | -1) => Promise<void>;
    steps: FormStep<TValues>[];
};

/**
 * React context storing state for multi-step form navigation and metadata.
 *
 * Components within a `MultiStepFormProvider` can access this context to navigate
 * between steps, validate, and retrieve metadata about the current form step.
 *
 * @example
 * ```ts
 * const multiStep = useContext(MultiStepFormContext);
 * if (!multiStep)
 *   throw new Error("MultiStepFormContext must be used within a MultiStepFormProvider");
 *
 * console.log(multiStep.currentStep.title);
 * ```
 */
export const MultiStepFormContext = createContext<
    MultiStepFormContextValues<any> | undefined
>(undefined);
