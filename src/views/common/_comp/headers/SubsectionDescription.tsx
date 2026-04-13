/**
 * @file A specialized paragraph component for subsection descriptions.
 * @filename SubsectionDescription.tsx
 */

import {cn} from "@/common/lib/utils.ts";
import {ReactNode} from "react";

/**
 * Props for the {@link SubsectionDescription} component.
 */
type DescProps = {
    /** The descriptive text or elements. */
    children?: ReactNode;

    /** Optional additional CSS classes for layout or typography adjustments. */
    className?: string;
};

/**
 * Renders a standardized description paragraph meant to accompany subsection titles.
 */
export const SubsectionDescription = (
    {children, className}: DescProps
) => {
    return (
        <p className={cn("subsection-description", className)}>
            {children}
        </p>
    );
};