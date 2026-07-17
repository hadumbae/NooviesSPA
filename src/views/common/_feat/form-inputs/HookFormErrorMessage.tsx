/**
 * @fileoverview Component for displaying validation error messages from React Hook Form.
 */

import {forwardRef} from 'react';
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {FieldError} from "react-hook-form";

/** Props for the HookFormErrorMessage component. */
type ErrorProps = {
    className?: string;
    error?: FieldError;
}

/** Displays a field error message with consistent styling. */
export const HookFormErrorMessage = forwardRef<HTMLParagraphElement, ErrorProps>(({error, className}, ref) => {
    if (!error) return null;

    return (
        <p ref={ref} className={cn("text-[0.8rem] font-medium text-red-500 dark:text-red-700", className)}>
            {error.message}
        </p>
    );
});
