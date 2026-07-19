/**
 * @fileoverview A button component that displays a tooltip on hover.
 */

import {forwardRef, ReactNode} from 'react';
import {Tooltip, TooltipContent, TooltipTrigger} from "@/views/common/_comp/ui/tooltip.tsx";
import {Button, ButtonProps} from "@/views/common/_comp/ui/button.tsx";

/** Props for the TooltipButton component. */
export type TooltipButtonProps = ButtonProps & {
    tooltipText: ReactNode;
};

/** A button component that displays a tooltip on hover. Requires a TooltipProvider. */
export const TooltipButton = forwardRef<HTMLButtonElement, TooltipButtonProps>((props, ref) => {
    const {children, tooltipText, ...buttonProps} = props;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button {...buttonProps} ref={ref}>{children}</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltipText}</p>
            </TooltipContent>
        </Tooltip>
    );
});
