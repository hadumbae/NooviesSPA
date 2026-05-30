/**
 * @fileoverview Styled paragraph wrapper for movie review content.
 */

import {cn} from "@/common/lib/utils.ts";
import {ReactElement, ReactNode} from "react";

/** Props for the MovieReviewText component. */
type TextProps = {
    children?: ReactNode;
    className?: string;
    text?: string;
};

/** Renders formatted review text with standard administrative styling. */
export function MovieReviewText(
    {children, className, text}: TextProps
): ReactElement {
    return (
        <p className={cn(
            "primary-text italic leading-relaxed",
            className
        )}>
            {children ?? text}
        </p>
    );
}

