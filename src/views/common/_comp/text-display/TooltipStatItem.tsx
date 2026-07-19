/**
 * @fileoverview A stat item component wrapped in a tooltip for additional context.
 */

import {ReactElement} from 'react';
import {LucideIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/views/common/_comp/ui";
import {StatItem} from "@/views/common/_comp/text-display/StatItem.tsx";

/** Props for the TooltipStatItem component. */
type TooltipStatItemProps = {
    tooltip: string;
    text: string;
    icon: LucideIcon;
    iconSize?: string | number;
    srLabel?: string;
};

/**
 * Displays a statistical data point with an icon and a hoverable tooltip.
 */
export function TooltipStatItem(
    {tooltip, ...props}: TooltipStatItemProps
): ReactElement {
    return (
        <Tooltip>
            <TooltipContent>{tooltip}</TooltipContent>
            <TooltipTrigger>
                <StatItem {...props} />
            </TooltipTrigger>
        </Tooltip>
    );
}
