/**
 * @fileoverview A specialized button component optimized for displaying icons.
 */

import {Button, ButtonProps} from "@/common/components/ui/button.tsx";
import {forwardRef} from "react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {LucideIcon} from "lucide-react";

export type IconButtonProps = ButtonProps & {
    icon?: LucideIcon;
};

/**
 * Renders a compact, circular button designed specifically for icon-only or
 * icon-focused interactions. Inherits standard Button behavior and accessibility.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
    const {children, icon: Icon, className, ...rest} = props;

    return (
        <Button
            variant="outline"
            size="icon"
            ref={ref}
            className={cn("hover-text-colour rounded-3xl", className)}
            {...rest}
        >
            {children ?? (Icon && <Icon/>)}
        </Button>
    );
});

IconButton.displayName = "IconButton";

