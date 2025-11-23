/**
 * @file MultiStepFormProgressIndicator.tsx
 * @description
 * Renders a horizontal progress indicator for multi-step (wizard) forms.
 *
 * This component:
 * - Retrieves step metadata from `useMultiStepFormContext`
 * - Displays each step using `MultiStepFormProgressIndicatorStep`
 * - Shows the user where they are in the multi-step process
 *
 * It is purely a visual/presentational component and contains no navigation logic.
 *
 * @example
 * ```tsx
 * <MultiStepFormProgressIndicator />
 * ```
 */

import { cn } from "@/common/lib/utils.ts";
import MultiStepFormProgressIndicatorStep
    from "@/common/components/forms/multi-step-form/progress-indicator/MultiStepFormProgressIndicatorStep.tsx";
import { FC } from "react";
import useMultiStepFormContext from "@/common/hooks/context/useMultiStepFormContext.ts";

/**
 * Displays a horizontal sequence of indicators representing each step
 * of a multi-step form. The current and completed steps are visually
 * highlighted by `MultiStepFormProgressIndicatorStep`.
 *
 * Step data is automatically sourced from `useMultiStepFormContext`,
 * so this component does not accept props.
 *
 * @example
 * ```tsx
 * <MultiStepFormProgressIndicator />
 * ```
 */
const MultiStepFormProgressIndicator: FC = () => {
    const { steps } = useMultiStepFormContext();

    return (
        <ol
            className={cn(
                "flex items-center justify-between",
                "space-x-6 lg:space-x-8"
            )}
        >
            {steps.map((step, index) => (
                <MultiStepFormProgressIndicatorStep
                    key={`step-${index}-${step.stepCount}`}
                    stepIndex={index}
                    step={step}
                    isLastStep={index === steps.length - 1}
                />
            ))}
        </ol>
    );
};

export default MultiStepFormProgressIndicator;
