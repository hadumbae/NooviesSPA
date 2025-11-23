/**
 * @file MultiStepFormStepButtons.tsx
 * @description
 * Renders navigation buttons for a multi-step (wizard) form.
 *
 * The component:
 * - Shows a **Back** button unless the user is on the first step
 * - Shows a **Next** button unless the user is on the last step
 * - Shows a **Submit** button only on the final step
 *
 * Navigation is driven by `changeStep()` and state helpers (`isFirstStep`, `isLastStep`)
 * provided by `useMultiStepFormContext`.
 *
 * @example
 * ```tsx
 * <MultiStepFormStepButtons />
 * ```
 */

import { FC } from "react";
import useMultiStepFormContext from "@/common/hooks/context/useMultiStepFormContext.ts";
import { Button } from "@/common/components/ui/button.tsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Renders the set of navigation buttons used within a multi-step form:
 *
 * - **Back** button: appears on all steps except the first
 * - **Next** button: appears on all steps except the last
 * - **Submit** button: appears only on the final step
 *
 * Uses the multi-step form context to determine which buttons to render and
 * to perform navigation actions.
 *
 * @example
 * ```tsx
 * // Inside a <form> element within a MultiStepFormProvider:
 * <MultiStepFormStepButtons />
 * ```
 */
const MultiStepFormStepButtons: FC = () => {
    const { isLastStep, isFirstStep, changeStep } = useMultiStepFormContext();

    return (
        <div className="grid grid-cols-2 gap-4">
            {!isFirstStep() ? (
                <Button variant="secondary" type="button" onClick={() => changeStep(-1)}>
                    <ChevronLeft />
                </Button>
            ) : (
                <div></div>
            )}

            {!isLastStep() && (
                <Button variant="secondary" type="button" onClick={() => changeStep(1)}>
                    <ChevronRight />
                </Button>
            )}

            {isLastStep() && (
                <Button variant="primary" type="submit" className="w-full">
                    Submit
                </Button>
            )}
        </div>
    );
};

export default MultiStepFormStepButtons;
