/**
 * @fileoverview Vertical flex container for page-level layout.
 * Ensures a consistent full-height column structure with standardized
 * spacing and overflow management for administrative pages.
 */

import {ReactElement, ReactNode} from 'react';
import {cn} from "@/common/lib/utils.ts";

type WrapperProps = {
    children: ReactNode;
    className?: string;
};

/**
 * Wraps page content in a full-height flex column layout.
 */
export function PageFlexWrapper({children, className}: WrapperProps): ReactElement {
    return (
        <section className={cn(
            "h-full flex flex-col space-y-5 w-full overflow-hidden",
            className
        )}>
            {children}
        </section>
    );
}