/**
 * @file MultiStepFormStepButtons.tsx
 *
 * Renders navigation controls for a multi-step (wizard-style) form.
 *
 * The component conditionally displays:
 * - **Back** button — hidden on the first step
 * - **Next** button — hidden on the final step
 * - **Submit** button — shown only on the final step
 * - **Reset** button — always shown, clears form and step state
 *
 * Navigation and state are driven by helpers exposed from
 * {@link useMultiStepFormContext}.
 *
 * @example
 * ```tsx
 * <MultiStepFormStepButtons />
 * ```
 */

import {FC} from "react";
import useMultiStepFormContext from "@/common/hooks/context/useMultiStepFormContext.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {ChevronLeft, ChevronRight, RefreshCw} from "lucide-react";

/**
 * Multi-step form navigation button group.
 *
 * Uses the multi-step form context to:
 * - Determine the current step position
 * - Navigate between steps
 * - Reset the entire form flow
 *
 * Expected to be rendered inside a `<form>` element wrapped by
 * `MultiStepFormProvider`.
 *
 * @example
 * ```tsx
 * // Inside a MultiStepFormProvider
 * <form onSubmit={form.handleSubmit(onSubmit)}>
 *   <MultiStepFormStepButtons />
 * </form>
 * ```
 */
const MultiStepFormStepButtons: FC = () => {
    const {
        isLastStep,
        isFirstStep,
        changeStep,
        resetForm,
    } = useMultiStepFormContext();

    return (
        <div className="grid grid-cols-3 gap-4">
            {!isFirstStep() ? (
                <Button
                    variant="secondary"
                    type="button"
                    onClick={() => changeStep(-1)}
                >
                    <ChevronLeft/>
                </Button>
            ) : (
                <div/>
            )}

            <Button
                variant="outline"
                type="button"
                onClick={() => resetForm()}
                aria-label="Reset form"
            >
                <RefreshCw className="hover:animate-spin"/>
            </Button>

            {!isLastStep() && (
                <Button
                    variant="secondary"
                    type="button"
                    onClick={() => changeStep(1)}
                >
                    <ChevronRight/>
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
