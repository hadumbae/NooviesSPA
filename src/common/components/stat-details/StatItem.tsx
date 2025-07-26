import {FC} from 'react';
import {LucideIcon} from "lucide-react";

/**
 * Props for the `StatItem` component.
 */
type StatItemProps = {
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
 * A small display component that shows a statistic or label next to an icon.
 * It supports an optional screen reader label for accessibility.
 *
 * @param text - The main text content to display.
 * @param icon - The icon to render beside the text.
 * @param iconSize - Optional size of the icon.
 * @param srLabel - Optional screen-reader label.
 */
const StatItem: FC<StatItemProps> = ({text, icon: Icon, iconSize, srLabel}) => {
    return (
        <dd className="flex items-center gap-2">
            {srLabel && <span className="sr-only">{srLabel}</span>}
            <span>{text}</span>
            <Icon size={iconSize}/>
        </dd>
    );
};

export default StatItem;
