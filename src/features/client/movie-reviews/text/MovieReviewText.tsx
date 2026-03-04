/**
 * @file Styled paragraph wrapper for movie review content.
 *
 * MovieReviewText.tsx
 */

import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {ReactNode} from "react";

/**
 * Props for MovieReviewText.
 */
type TextProps = {
    /**
     * Review content.
     */
    children: ReactNode;

    /**
     * Additional classes applied to the paragraph.
     */
    className?: string;
};

/**
 * Renders formatted review text.
 */
const MovieReviewText = ({children, className}: TextProps) => {
    return (
        <p className={cn(
            PrimaryTextBaseCSS,
            "text-justify",
            className
        )}>
            {children}
        </p>
    );
};

export default MovieReviewText;