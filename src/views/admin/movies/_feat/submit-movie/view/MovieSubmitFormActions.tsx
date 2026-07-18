/**
 * @fileoverview Action buttons for the movie submission form.
 */

import {ReactElement} from "react";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {Button} from "@/common/components/ui/button.tsx";
import {AnimatedLoader} from "@/views/common/_comp/loaders/AnimatedLoader.tsx";
import {RotateCw} from "lucide-react";
import {cn} from "@/common/_feat";

/** Props for the MovieSubmitFormActions component. */
type ActionProps = {
    className?: string;
};

/**
 * Renders the submit and reset actions for the movie form.
 */
export function MovieSubmitFormActions(
    {className}: ActionProps
): ReactElement {
    const {formID, isPending} = useBaseFormContext();

    return (
        <div className={cn("flex items-center space-x-2 justify-end", className)}>
            <Button
                form={formID}
                type="submit"
                variant="primary"
                disabled={isPending}
                className="max-md:flex-1"
            >
                {isPending ? <AnimatedLoader/> : "Submit Movie"}
            </Button>
            <Button variant="secondary">
                <RotateCw/>
            </Button>
        </div>
    );
}