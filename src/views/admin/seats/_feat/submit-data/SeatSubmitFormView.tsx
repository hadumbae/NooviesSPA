/**
 * @fileoverview Pure view component for the seat submission form, rendering dynamic fieldsets and action buttons.
 */

import {ReactElement} from "react";
import {SeatFormValues, useBuildSeatFormRenderFields} from "@/domains/seats/_feat/submit-data";
import {useFormContext} from "react-hook-form";
import {Button} from "@/common/components/ui/button.tsx";
import {RotateCcw} from "lucide-react";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {BaseFormContext} from "@/common/features/generic-form-context";
import {cn} from "@/common/lib/utils.ts";

/** Props for the SeatSubmitFormView component. */
type ViewProps = {
    disableFields?: Partial<Record<keyof SeatFormValues, boolean>>;
    className?: string;
};

/**
 * Renders the structural layout of the seat form, including conditional fieldsets and submission controls.
 */
export function SeatSubmitFormView(
    {disableFields, className}: ViewProps
): ReactElement {
    const {reset} = useFormContext();
    const {formID, isPending} = useRequiredContext({context: BaseFormContext});

    const renderedFields = useBuildSeatFormRenderFields({disableFields});

    return (
        <div className={cn("space-y-4", className)}>
            {renderedFields}

            <div className="flex items-center space-x-2">
                <Button
                    form={formID}
                    variant="primary"
                    type="submit"
                    className="flex-1"
                    disabled={isPending}
                >
                    {isPending ? "Submitting..." : "Submit"}
                </Button>

                <Button
                    variant="secondary"
                    type="button"
                    disabled={isPending}
                    onClick={() => reset()}
                >
                    <RotateCcw className="h-4 w-4"/>
                </Button>
            </div>
        </div>
    );
}