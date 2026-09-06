/**
 * @fileoverview Reusable submit button component that displays a loading spinner during form submission.
 */

import {ReactElement} from "react";
import {Loader} from "lucide-react";
import {Button, ButtonProps} from "@/views/common/_comp/ui";
import {useBaseFormContext} from "@/common/_feat";

type FormButtonProps = Omit<ButtonProps, "type">;

/**
 * Submit button that automatically disables itself and shows a spinner during pending form states.
 * Requires wrapping in a BaseForm context provider.
 */
export function FormPendingSubmitButton(
    {children, disabled, variant = "primary", ...props}: FormButtonProps
): ReactElement {
    const {isPending} = useBaseFormContext();

    return (
        <Button
            {...props}
            variant="primary"
            type="submit"
            disabled={disabled || isPending}
        >
            {isPending ? <Loader className="animate-spin"/> : children}
        </Button>
    );
}