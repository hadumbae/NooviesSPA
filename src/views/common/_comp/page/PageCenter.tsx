/**
 * @fileoverview A utility component to center content both horizontally and vertically.
 * Ideal for empty states, 404 pages, or splash content within a page-level container.
 */

import {cn} from "@/common/lib/utils.ts";
import {ReactNode} from "react";

type CentreProps = {
    /** The content to be centered. */
    children: ReactNode;
    /** Optional additional CSS classes for custom styling. */
    className?: string;
};

/**
 * Renders a full-height flex container that centers its children along both axes.
 */
export function PageCenter({children, className}: CentreProps) {
    return (
        <div className={cn(
            'h-full',
            'flex',
            'flex-col',
            'justify-center',
            'items-center',
            className,
        )}>
            {children}
        </div>
    );
}