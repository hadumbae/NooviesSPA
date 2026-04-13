/**
 * @file Typography component for standardized page and section headings.
 * @filename PageSectionHeader.tsx
 */

import {ReactNode} from "react";
import {HeaderTag} from "@/common/type/HeaderTag.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * Properties for the {@link PageSectionHeader} component.
 */
type SectionProps = {
    /** Nested elements to render within the header. Takes precedence over `text`. */
    children?: ReactNode;

    /**
     * Optional plain text content.
     * Convenient for simple headers where complex nesting isn't required.
     */
    text?: string;

    /** Additional CSS classes for custom sizing, colors, or margin overrides. */
    className?: string;

    /**
     * The semantic HTML element to render.
     * Defaults to `h1`. Ensures accessibility and proper document outline structure.
     */
    as?: HeaderTag;
};

/**
 * A reusable heading component that applies global "Section Header" visual styles.
 */
export const PageSectionHeader = (
    {children, text, className, as: Tag = "h1"}: SectionProps
) => {
    return (
        <Tag className={cn("section-header-visual", className)}>
            {children ?? text}
        </Tag>
    );
};