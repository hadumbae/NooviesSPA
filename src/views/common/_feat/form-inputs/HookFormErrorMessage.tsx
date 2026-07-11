/**
 * @fileoverview Component for displaying validation error messages from React Hook Form.
 */

import {forwardRef} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {FieldError} from "react-hook-form";
import {ErrorMessageCSS} from "@/common/constants/css/TextCSS.ts";

type ErrorProps = {
    className?: string;
    error?: FieldError;
}

/** Displays a field error message with consistent styling. */
export const HookFormErrorMessage = forwardRef<HTMLParagraphElement, ErrorProps>(({error, className}, ref) => {
    if (!error) return null;

    return (
        <p ref={ref} className={cn(ErrorMessageCSS, className)}>
            {error.message}
        </p>
    );
});
