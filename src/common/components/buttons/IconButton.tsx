/**
 * @fileoverview A specialized button component optimized for displaying icons.
 * Extends the standard Button component with circular styling and hover effects.
 */

import {Button, ButtonProps} from "@/common/components/ui/button.tsx";
import {forwardRef} from "react";
import {cn} from "@/common/lib/utils.ts";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import {LucideIcon} from "lucide-react";

export type IconButtonProps = ButtonProps & {
    /** Optional Lucide icon component to render if children are not provided. */
    icon?: LucideIcon;
};

/**
 * Renders a compact, circular button designed specifically for icon-only or
 * icon-focused interactions. Inherits standard Button behavior and accessibility.
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
    const {children, icon: Icon, className, ...rest} = props;

    return (
        <Button
            variant="outline"
            size="icon"
            ref={ref}
            className={cn(
                HoverLinkCSS,
                "rounded-3xl",
                className
            )}
            {...rest}
        >
            {children ?? (Icon && <Icon />)}
        </Button>
    );
});

IconButton.displayName = "IconButton";

export default IconButton;