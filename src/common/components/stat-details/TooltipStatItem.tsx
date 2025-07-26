import {FC} from 'react';
import {LucideIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/common/components/ui/tooltip.tsx";
import StatItem from "@/common/components/stat-details/StatItem.tsx";

/**
 * Props for the `TooltipStatItem` component.
 */
type TooltipStatItemProps = {
    /**
     * The tooltip text shown when the user hovers or focuses the stat item.
     */
    tooltip: string;

    /**
     * The textual value or label to be displayed alongside the icon.
     */
    text: string;

    /**
     * A Lucide icon component to visually represent the statistic.
     */
    icon: LucideIcon;

    /**
     * Optional size for the icon. Can be a number (pixels) or string (e.g. `"1em"`).
     */
    iconSize?: string | number;

    /**
     * An optional screen-reader-only label for accessibility.
     * This will be rendered inside a visually hidden `<span>`.
     */
    srLabel?: string;
};

/**
 * A wrapper around `StatItem` that adds a tooltip on hover or focus.
 * Useful for adding extra context to a statistic in a compact UI.
 *
 * @param tooltip - Tooltip text to display on hover/focus.
 * @param props - Remaining props passed to the underlying `StatItem` component.
 */
const TooltipStatItem: FC<TooltipStatItemProps> = ({tooltip, ...props}) => {
    return (
        <Tooltip>
            <TooltipContent>{tooltip}</TooltipContent>
            <TooltipTrigger>
                <StatItem {...props} />
            </TooltipTrigger>
        </Tooltip>
    );
};

export default TooltipStatItem;
