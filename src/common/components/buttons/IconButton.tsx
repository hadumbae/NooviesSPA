import { Button, ButtonProps } from "@/common/components/ui/button.tsx";
import { forwardRef } from "react";
import { cn } from "@/common/lib/utils.ts";

/**
 * Props for `IconButton`.
 * Inherits all `ButtonProps` from the base `Button` component.
 */
export type IconButtonProps = ButtonProps;

/**
 * `IconButton` is a small button designed to hold icons.
 * It wraps the base `Button` component with preset styles for icon usage.
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
    const { children, className, ...rest } = props;

    return (
        <Button
            variant="outline"
            size="icon"
            ref={ref}
            className={cn(
                "text-neutral-400 hover:text-black rounded-3xl",
                className
            )}
            {...rest}
        >
                {children}
        </Button>
    );
});

IconButton.displayName = "IconButton";

export default IconButton;
