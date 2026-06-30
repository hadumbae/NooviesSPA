/**
 * @fileoverview Specialized dropdown trigger button for administrative navigation menus.
 */

import {cn} from "@/common/lib/utils.ts";
import {forwardRef} from "react";
import {ChevronDown} from "lucide-react";
import {Button, ButtonProps} from "@/common/components/ui";

/**
 * Props for the NavigationDropdownButton component. */
type LinkProps = ButtonProps & {
    text: string;
    isActive?: boolean;
};

/**
 * A ref-forwarding trigger for DropdownMenu components within a Navigation Bar.
 */
export const NavigationDropdownButton = forwardRef<HTMLButtonElement, LinkProps>((params, ref) => {
    const {
        className,
        text,
        isActive,
        size = "sm",
        variant = "link",
        ...rest
    } = params;

    return (
        <Button
            ref={ref}
            variant={variant}
            size={size}
            className={cn(!isActive && "link-button", className)}
            {...rest}
        >
            {text} <ChevronDown/>
        </Button>
    );
});