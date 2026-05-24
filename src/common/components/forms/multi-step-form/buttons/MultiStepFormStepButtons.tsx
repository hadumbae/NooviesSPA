/**
 * @fileoverview Navigation controls for a multi-step form.
 */

import {ReactElement} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import {ChevronLeft, ChevronRight, RefreshCw} from "lucide-react";
import {useMultiStepFormSetterContext} from "@/common/_feat/multi-step-form/hooks/useMultiStepFormSetterContext.ts";

/**
 * Renders navigation and submission buttons for a wizard-style form.
 */
export function MultiStepFormStepButtons(): ReactElement {
    const {isLastStep, isFirstStep, changeStep, resetForm,} = useMultiStepFormSetterContext();

    return (
        <div className="grid grid-cols-3 gap-4">
            {
                !isFirstStep() ? (
                    <Button variant="secondary" type="button" onClick={() => changeStep(-1)}>
                        <ChevronLeft/>
                    </Button>
                ) : (
                    <div/>
                )
            }

            <Button
                variant="outline"
                type="button"
                onClick={() => resetForm()}
                aria-label="Reset form"
            >
                <RefreshCw className="hover:animate-spin"/>
            </Button>

            {
                !isLastStep() && (
                    <Button variant="secondary" type="button" onClick={() => changeStep(1)}>
                        <ChevronRight/>
                    </Button>
                )
            }

            {
                isLastStep() && (
                    <Button variant="primary" type="submit" className="w-full">
                        Submit
                    </Button>
                )
            }
        </div>
    );
}
