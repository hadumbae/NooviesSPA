/**
 * @fileoverview Action buttons for the Role Type submission form.
 */

import {ReactElement} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {AnimatedLoader} from "@/views/common/_comp/loaders/AnimatedLoader.tsx";

/** Props for the RoleTypeSubmitFormActions component. */
type ActionProps = {
    className?: string;
    submitButtonText?: string;
};

/**
 * Renders the submit button for the Role Type form.
 */
export function RoleTypeSubmitFormActions(
    {className, submitButtonText}: ActionProps
): ReactElement {
    const {isPending} = useBaseFormContext();

    return (
        <div className={className}>
            <Button variant="primary" className="w-full" disabled={isPending}>
                {isPending ? <AnimatedLoader/> : submitButtonText ?? "Submit"}
            </Button>
        </div>
    );
}