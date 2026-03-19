/**
 * @file Text wrapper used within movie credit list items.
 * @filename MovieCreditInfoListItemText.tsx
 */

import {ReactNode} from "react";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for {@link MovieCreditInfoListItemText}.
 */
type TextProps = {
    /** Content rendered inside the text element */
    children: ReactNode;

    /** Optional CSS classes applied to the text element */
    className?: string;
}

/**
 * Renders styled text for movie credit list items.
 */
const MovieCreditInfoListItemText = (
    {children: text, className}: TextProps
) => {
    return (
        <span className={cn(
            PrimaryTextBaseCSS,
            "text-sm md:text-base",
            className
        )}>
            {text}
        </span>
    );
};

export default MovieCreditInfoListItemText;