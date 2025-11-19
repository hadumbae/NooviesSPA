/**
 * @file HookFormErrorMessage.tsx
 * @description
 * A small reusable component to display error messages from `react-hook-form`.
 * Automatically applies consistent styling for form error messages, including dark mode support.
 *
 * @example
 * <HookFormErrorMessage error={formState.errors.name} />
 */

import {FC} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {FieldError} from "react-hook-form";

/**
 * Props for the {@link HookFormErrorMessage} component.
 */
interface Props {
    /** The error object returned from `react-hook-form` for a specific field. */
    error?: FieldError;

    /** Optional additional CSS classes for styling. */
    className?: string;
}

/**
 * `HookFormErrorMessage` displays a form field error message with consistent styling.
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} A styled paragraph containing the error message, or nothing if no error exists.
 *
 * @example
 * <HookFormErrorMessage error={formState.errors.email} />
 */
const HookFormErrorMessage: FC<Props> = ({error, className}) => {
    return (
        <p className={cn("text-[0.8rem] font-medium text-red-500 dark:text-red-900", className)}>
            {error && error.message}
        </p>
    );
};

export default HookFormErrorMessage;
