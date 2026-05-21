/**
 * @fileoverview Component that renders the active step of a multi-step form.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {FormStep, useMultiStepFormStateContext} from "@/common/features/multi-step-form";

/** Props for the MultiStepFormCurrentStep component. */
type FormProps<TValues extends FieldValues> = {
    steps: FormStep<TValues>[];
};

/**
 * Renders the component associated with the current step index.
 * - Requires wrapping in a MultiStepFormStateContext provider.
 */
export function MultiStepFormCurrentStep<TValues extends FieldValues>(
    {steps}: FormProps<TValues>
): ReactElement {
    const {currentStepIndex} = useMultiStepFormStateContext<TValues>();

    return (
        steps[currentStepIndex].component
    );
}