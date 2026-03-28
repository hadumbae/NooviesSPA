/**
 * @file A polymorphic heading component for standardizing subsection titles.
 * @filename SubsectionTitle.tsx
 */

import {ReactNode} from "react";
import {cn} from "@/common/lib/utils.ts";
import {HeaderTag} from "@/common/type/HeaderTag.ts";

/**
 * Props for the {@link SubsectionTitle} component.
 */
type TitleProps = {
    /** The text or elements to be rendered within the heading tag. */
    children?: ReactNode;

    /** Optional additional CSS classes for custom styling or spacing. */
    className?: string;

    /** The semantic HTML heading level to render. */
    as?: HeaderTag;
};

/**
 * A flexible typography component that decouples visual styling from HTML semantics.
 */
export const SubsectionTitle = (
    {children, className, as: Tag = "h3"}: TitleProps
) => {
    return (
        <Tag className={cn("subsection-title", className)}>
            {children}
        </Tag>
    );
};