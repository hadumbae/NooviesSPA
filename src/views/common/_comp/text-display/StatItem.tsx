/**
 * @fileoverview A reusable component for displaying a single statistic or data point with an icon.
 */

import {ReactElement} from 'react';
import {LucideIcon} from "lucide-react";
import {SROnly} from "@/views/common/_comp/screen-readers";

/** Props for the StatItem component. */
type StatItemProps = {
    text: string;
    icon: LucideIcon;
    iconSize?: string | number;
    srLabel?: string;
};

/** Displays a label and an associated icon within a description list layout. */
export function StatItem({text, icon: Icon, iconSize, srLabel}: StatItemProps): ReactElement {
    return (
        <dl className="flex items-center gap-2">
            {srLabel && <SROnly text={srLabel}/>}

            <dt>{text}</dt>
            <Icon size={iconSize}/>
        </dl>
    );
}
