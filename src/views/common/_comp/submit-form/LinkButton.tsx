/**
 * @fileoverview A button component styled as a text link for form actions.
 */

import {forwardRef, ReactElement} from "react";
import {Button, ButtonProps} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Renders a button with link-style aesthetics while maintaining submit functionality.
 */
export const LinkButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({variant = "link", className, ...props}, ref): ReactElement => (
        <Button
            ref={ref}
            variant={variant}
            className={cn("link-button", className)}
            {...props}
        />
    ),
);