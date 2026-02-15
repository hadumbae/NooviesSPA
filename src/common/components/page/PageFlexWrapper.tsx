/**
 * @file PageFlexWrapper.tsx
 * Vertical flex container for page-level layout.
 */

import {ReactNode} from 'react';
import {cn} from "@/common/lib/utils.ts";

/**
 * @prop children Content to render.
 * @prop className Optional container styles.
 */
type WrapperProps = {
    children: ReactNode;
    className?: string;
}

/**
 * Wraps page content in a full-height flex column layout.
 */
const PageFlexWrapper = ({children, className}: WrapperProps) => {
    return (
        <section className={cn(
            "h-full flex flex-col space-y-5 w-full overflow-hidden",
            className,
        )}>
            {children}
        </section>
    );
};

export default PageFlexWrapper;