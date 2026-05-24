/**
 * @fileoverview Renders the submit and reset buttons for the seat submission form.
 */

import {ReactElement} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import {RotateCcw} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {useFormContext} from "react-hook-form";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";

/** Props for the SeatSubmitFormButtons component. */
type ButtonProps = {
    className?: string;
};

/** Renders the submit and reset buttons for the seat submission form. */
export function SeatSubmitFormButtons(
    {className}: ButtonProps
): ReactElement {
    const {reset} = useFormContext();
    const {formID, isPending} = useBaseFormContext();

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <Button
                form={formID}
                variant="primary"
                type="submit"
                className="flex-1"
                disabled={isPending}
            >
                {isPending ? <AnimatedLoader/> : "Submit"}
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
    );
}