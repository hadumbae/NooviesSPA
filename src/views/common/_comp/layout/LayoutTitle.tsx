/**
 * @fileoverview A reusable layout component for displaying page or section titles.
 */

import {ReactElement} from 'react';
import {cn} from "@/common/_feat";

/** Props for the LayoutTitle component. */
type TitleProps = {
    text: string;
    className?: string;
}

/**
 * Renders a stylised H1 heading with DotGothic16 typography.
 */
export function LayoutTitle(
    {text, className}: TitleProps
): ReactElement {
    return (
        <h1 className={cn("font-dotGothic16 text-xl", "dark:text-white", className)}>
            {text}
        </h1>
    );
}
