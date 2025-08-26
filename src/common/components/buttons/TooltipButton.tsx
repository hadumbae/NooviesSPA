import {FC, ReactNode} from 'react';
import {Tooltip, TooltipContent, TooltipTrigger} from "@/common/components/ui/tooltip.tsx";
import {Button, ButtonProps} from "@/common/components/ui/button.tsx";

interface TooltipButtonProps extends ButtonProps {
    tooltipText: ReactNode;
}

const TooltipButton: FC<TooltipButtonProps> = ({children, tooltipText, ...buttonProps}) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button {...buttonProps}>{children}</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltipText}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default TooltipButton;
