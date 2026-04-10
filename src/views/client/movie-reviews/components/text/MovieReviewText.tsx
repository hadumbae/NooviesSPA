/**
 * @file Styled paragraph wrapper for movie review content.
 * @filename MovieReviewText.tsx
 */

import {cn} from "@/common/lib/utils.ts";
import {ReactNode} from "react";

/**
 * Props for the {@link MovieReviewText} component.
 */
type TextProps = {
    /** The review content (supports nested elements like line breaks or highlights). */
    children?: ReactNode;

    /** Additional CSS classes for typography or spacing overrides. */
    className?: string;

    /** Optional fallback string to render if no children are provided. */
    text?: string;
};

/**
 * Renders formatted review text with standard administrative styling.
 * ---
 */
const MovieReviewText = ({children, className, text}: TextProps) => {
    return (
        <p className={cn(
            "primary-text italic leading-relaxed",
            className
        )}>
            {children ?? text}
        </p>
    );
};

export default MovieReviewText;