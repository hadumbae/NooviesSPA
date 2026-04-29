/**
 * @fileoverview A pre-styled primary button component used for form submissions.
 */

import {forwardRef, ReactElement} from "react";
import {Button, ButtonProps} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";

/** Props for the PrimaryButton component. */
type PrimaryProps = ButtonProps;

/**
 * Standardized submission button with a full-width layout and primary styling.
 */
export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryProps>(
    ({variant = "default", className, ...props}, ref): ReactElement => (
        <Button
            ref={ref}
            variant={variant}
            className={cn("primary-button", className)}
            {...props}
        />
    ),
);