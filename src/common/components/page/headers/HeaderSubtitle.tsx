/**
 * @fileoverview Reusable secondary heading component for page or section subtitles.
 * Provides a standardized h2 styling to maintain typographic hierarchy
 * throughout the administrative interface.
 */

import {ReactNode} from 'react';
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the HeaderSubtitle component.
 */
type SubtitleProps = {
    children?: ReactNode;
    text?: string;
    className?: string;
};

/**
 * Renders a semantic h2 subtitle with a refined typographic treatment,
 * using the 'page-subtitle' utility class.
 */
function HeaderSubtitle({children, text, className}: SubtitleProps) {
    return (
        <h2 className={cn("page-subtitle", className)}>
            {children ?? text}
        </h2>
    );
}

export default HeaderSubtitle;