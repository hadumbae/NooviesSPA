/**
 * @fileoverview Styled blockquote component for displaying quoted text.
 */

import {ReactElement, ReactNode} from 'react';
import {cn} from "@/common/_feat/handle-ui/cn.ts";

/** Props for the TextQuote component. */
type QuoteProps = {
    children: ReactNode;
    className?: string;
}

/** A styled blockquote component with a left border and justified text. */
export function TextQuote(
    {children, className}: QuoteProps
): ReactElement {
    return (
        <blockquote className={cn(
            "text-neutral-500 dark:text-gray-500 text-sm border-l-4 px-4 text-justify",
            className,
        )}>
            {children}
        </blockquote>
    );
}