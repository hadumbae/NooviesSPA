/**
 * @file HookFormErrorMessage.tsx
 * @description
 * Reusable component to display validation error messages from `react-hook-form`.
 *
 * Automatically applies consistent styling for form error messages, including dark mode support.
 * If no error is provided, the component renders nothing.
 *
 * @example
 * ```tsx
 * <HookFormErrorMessage error={formState.errors.name} />
 * ```
 * @module HookFormErrorMessage
 */

import {forwardRef} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {FieldError} from "react-hook-form";
import {ErrorMessageCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for the {@link HookFormErrorMessage} component.
 *
 * @property className - Optional additional Tailwind or CSS class names.
 * @property error - The error object returned from `react-hook-form` for a specific field.
 */
type ErrorProps = {
    className?: string;

    /** The error object returned from `react-hook-form` for a specific field. */
    error?: FieldError;
}

/**
 * Component that displays a form field error message with consistent styling.
 *
 * @remarks
 * - Integrates seamlessly with `react-hook-form` field errors.
 * - Applies `ErrorMessageCSS` styling by default.
 * - Supports optional additional `className`.
 *
 * @param {ErrorProps} props - Component props.
 * @param {React.Ref<HTMLParagraphElement>} ref - Optional ref forwarded to the paragraph element.
 * @returns {JSX.Element | null} A styled paragraph containing the error message, or `null` if no error exists.
 *
 * @example
 * ```tsx
 * <HookFormErrorMessage error={formState.errors.email} className="text-sm text-red-500" />
 * ```
 */
const HookFormErrorMessage = forwardRef<
    HTMLParagraphElement,
    ErrorProps
>(({error, className}, ref) => {
    if (!error) return null;

    return (
        <p ref={ref} className={cn(ErrorMessageCSS, className)}>
            {error.message}
        </p>
    );
});

export default HookFormErrorMessage;
