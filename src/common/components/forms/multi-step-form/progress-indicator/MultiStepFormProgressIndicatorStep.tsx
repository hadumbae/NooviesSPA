/**
 * @file MultiStepFormProgressIndicatorStep.tsx
 * @description
 * Represents a single step within the multi-step form progress indicator.
 *
 * This component:
 * - Receives step metadata (`title`, `stepCount`, and an optional `icon`)
 * - Determines whether the step is active or completed using
 *   `currentStepIndex` from `useMultiStepFormContext`
 * - Applies visual styling to reflect progress state
 *
 * Rendering is purely presentational. It does not control navigation.
 *
 * @example
 * ```tsx
 * <MultiStepFormProgressIndicatorStep
 *     stepIndex={0}
 *     step={steps[0]}
 *     isLastStep={false}
 * />
 * ```
 */

import { FormStep } from "@/common/type/form/SteppedFormTypes.ts";
import { FieldValues } from "react-hook-form";
import useMultiStepFormContext from "@/common/hooks/context/useMultiStepFormContext.ts";
import { cn } from "@/common/lib/utils.ts";

/**
 * Props for the `MultiStepFormProgressIndicatorStep` component.
 *
 * @template TValues - The shape of form values used in the multi-step form.
 *
 * @property stepIndex - The index of this step within the list of steps.
 * @property step - Metadata describing the step (title, icon, step count, etc.).
 * @property isLastStep - Optional flag indicating whether this is the final step.
 */
type StepProps<TValues extends FieldValues> = {
    stepIndex: number;
    step: FormStep<TValues>;
    isLastStep?: boolean;
};

/**
 * Renders an individual step inside the multi-step form progress indicator.
 *
 * The component automatically determines whether the step is:
 * - **Active**: `currentStepIndex >= stepIndex`
 * - **Inactive**: not yet reached
 *
 * Active steps display highlighted colors, while inactive ones appear neutral.
 *
 * @template TValues - The type of form values for this multi-step form.
 *
 * @example
 * ```tsx
 * <MultiStepFormProgressIndicatorStep
 *     stepIndex={1}
 *     step={formSteps[1]}
 * />
 * ```
 */
const MultiStepFormProgressIndicatorStep = <TValues extends FieldValues>(
    props: StepProps<TValues>
) => {
    const { stepIndex, step: { title, stepCount, icon: Icon } } = props;
    const { currentStepIndex } = useMultiStepFormContext();

    const isActiveStep = currentStepIndex >= stepIndex;

    return (
        <li
            className={cn(
                "flex-1",
                isActiveStep
                    ? "text-purple-600 dark:text-purple-600"
                    : "text-neutral-600 dark:text-neutral-600"
            )}
        >
            <div
                className={cn(
                    "flex flex-col font-medium space-y-2",
                    "border-l-2 border-t-0 lg:border-t-2 lg:border-l-0 border-solid",
                    "pl-4 pt-0 lg:pt-4 lg:pl-0",
                    isActiveStep ? "border-purple-600" : "border-neutral-600"
                )}
            >
                <span
                    className={cn(
                        "inline-flex items-center gap-x-2",
                        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                        "text-xs font-medium lg:text-base"
                    )}
                >
                    <Icon />
                </span>

                <h4 className="max-lg:hidden text-sm lg:text-lg select-none truncate">
                    {title}
                </h4>

                <h4 className="lg:hidden text-sm">
                    Step {stepCount}
                </h4>
            </div>
        </li>
    );
};

export default MultiStepFormProgressIndicatorStep;
