/**
 * @file Specialized dropdown trigger button for administrative navigation menus.
 * @filename NavigationDropdownButton.tsx
 */

import {cn} from "@/common/lib/utils.ts";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import {ChevronDown} from "lucide-react";
import {Button, ButtonProps} from "@/common/components/ui/button.tsx";
import {forwardRef} from "react";

/**
 * Props for {@link NavigationDropdownButton}.
 */
type LinkProps = ButtonProps & {
    /** The display label for the navigation category. */
    text: string;
    /** Highlighting flag; true if a child route of this dropdown is currently active. */
    isActive?: boolean;
};

/**
 * A ref-forwarding trigger for `DropdownMenu` components within a Navigation Bar.
 * @param `params` - Component properties including text and active state.
 * @param `ref` - Forwarded reference to the button element.
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
            className={cn(
                /** Apply hover transition only if not currently on an active route. */
                !isActive && HoverLinkCSS,
                className
            )}
            {...rest}
        >
            {text} <ChevronDown/>
        </Button>
    );
});