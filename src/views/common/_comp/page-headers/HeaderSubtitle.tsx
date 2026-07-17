/**
 * @fileoverview Reusable secondary heading component for page or section subtitles.
 */

import {ReactNode} from 'react';
import {cn} from "@/common/_feat/handle-ui/cn.ts";

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
export function HeaderSubtitle({children, text, className}: SubtitleProps) {
    return (
        <h2 className={cn("page-subtitle", className)}>
            {children ?? text}
        </h2>
    );
}

