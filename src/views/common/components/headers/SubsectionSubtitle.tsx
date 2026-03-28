/**
 * @file A polymorphic heading component for subsection-level subtitles.
 * @filename SubsectionSubtitle.tsx
 */

import {ReactNode} from "react";
import {cn} from "@/common/lib/utils.ts";
import {HeaderTag} from "@/common/type/HeaderTag.ts";

/**
 * Props for the {@link SubsectionSubtitle} component.
 */
type TitleProps = {
    /** The content to be rendered within the subtitle tag. */
    children?: ReactNode;

    /** Optional additional CSS classes for custom styling. */
    className?: string;

    /** The semantic HTML heading level to render. */
    as?: HeaderTag;
};

/**
 * Provides a consistent subtitle style for nested sections within a subsection.
 */
export const SubsectionSubtitle = (
    {children, className, as: Tag = "h4"}: TitleProps
) => {
    return (
        <Tag className={cn("subsection-subtitle", className)}>
            {children}
        </Tag>
    );
};