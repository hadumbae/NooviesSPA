/**
 * @fileoverview Layout view for a multi-step form including progress indicators and navigation buttons.
 */

import {ReactElement, ReactNode} from "react";
import {
    MultiStepFormProgressIndicator
} from "@/common/components/forms/multi-step-form/progress-indicator/MultiStepFormProgressIndicator.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import {
    MultiStepFormStepButtons
} from "@/common/components/forms/multi-step-form/buttons/MultiStepFormStepButtons.tsx";

/** Props for the MultiStepFormView component. */
type FormProps = {
    children: ReactNode;
};

/**
 * Renders the structural layout for multi-step forms with a scrollable progress bar.
 */
export function MultiStepFormView({children}: FormProps): ReactElement {
    return (
        <div className="p-3 md:p-10 space-y-5">
            <ScrollArea className="w-full py-5">
                <MultiStepFormProgressIndicator/>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>

            <div className="space-y-3">
                {children}

                <MultiStepFormStepButtons/>
            </div>
        </div>
    );
}