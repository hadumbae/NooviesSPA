/**
 * @fileoverview Renders a horizontal progress indicator for multi-step wizard forms.
 */

import {
    MultiStepFormProgressIndicatorStep
} from "@/common/components/forms/multi-step-form/progress-indicator/MultiStepFormProgressIndicatorStep.tsx";
import {ReactElement} from "react";
import {useMultiStepFormStateContext} from "@/common/_feat/multi-step-form";

/**
 * Displays a sequence of indicators representing each step of a multi-step form.
 */
export function MultiStepFormProgressIndicator(): ReactElement {
    const {stepMeta} = useMultiStepFormStateContext();

    return (
        <ol className="flex items-center justify-between space-x-6 lg:space-x-8">
            {stepMeta.map((step, index) => (
                <MultiStepFormProgressIndicatorStep
                    key={`step-${index}-${step.stepCount}`}
                    stepIndex={index}
                    step={step}
                    isLastStep={index === stepMeta.length - 1}
                />
            ))}
        </ol>
    );
}