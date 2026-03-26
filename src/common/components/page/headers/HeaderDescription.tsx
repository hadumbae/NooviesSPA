/**
 * @file Reusable descriptive text component for page or section headers.
 * @filename HeaderDescription.tsx
 */

import {ReactNode} from 'react';
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the {@link HeaderDescription} component.
 */
type DescriptionProps = {
    /** The content of the description paragraph. */
    children?: ReactNode;
    /** Optional additional CSS classes for layout or color overrides. */
    className?: string;
};

/**
 * A paragraph component designed to provide secondary context under a {@link HeaderTitle}.
 */
const HeaderDescription = ({children, className}: DescriptionProps) => {
    return (
        <p className={cn(
            "text-justify",
            "text-neutral-500 dark:text-neutral-300",
            "text-xs xl:text-base",
            className,
        )}>
            {children}
        </p>
    );
};

export default HeaderDescription;