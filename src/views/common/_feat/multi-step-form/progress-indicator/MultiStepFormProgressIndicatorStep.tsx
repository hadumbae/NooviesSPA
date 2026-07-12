/**
 * @fileoverview Progress indicator step component for multi-step forms.
 */

import {FormStepMeta} from "@/common/_feat/multi-step-form/types.ts";
import {FieldValues} from "react-hook-form";
import useMultiStepFormContext from "@/common/hooks/context/useMultiStepFormContext.ts";
import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

/** Props for the MultiStepFormProgressIndicatorStep component. */
type StepProps<TValues extends FieldValues> = {
    stepIndex: number;
    step: FormStepMeta<TValues>;
    isLastStep?: boolean;
};

/**
 * Renders an individual step within the progress indicator.
 * - Requires MultiStepFormContext to determine the active state.
 */
export function MultiStepFormProgressIndicatorStep<TValues extends FieldValues>(
    {stepIndex, step: {title, stepCount, icon: Icon}}: StepProps<TValues>
): ReactElement {
    const {currentStepIndex} = useMultiStepFormContext();
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
                    <Icon/>
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
}
