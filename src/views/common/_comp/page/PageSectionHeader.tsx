/**
 * @fileoverview Typography component for standardized page and section headings.
 * Ensures visual consistency across the application by applying global heading
 * styles while maintaining semantic HTML flexibility.
 */

import {ReactElement, ReactNode} from "react";
import {HeaderTag} from "@/common/type/HeaderTag.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * Properties for the PageSectionHeader component.
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
     * The semantic HTML element to render (h1-h6).
     * Defaults to `h1`. Ensures accessibility and proper document outline structure.
     */
    as?: HeaderTag;
};

/**
 * A reusable heading component that applies global "Section Header" visual styles.
 * Centralizes the application's header aesthetics to ensure a unified look
 * and feel for all section titles.
 */
export function PageSectionHeader(
    {children, text, className, as: Tag = "h1"}: SectionProps
): ReactElement {
    return (
        <Tag className={cn("section-header-visual", className)}>
            {children ?? text}
        </Tag>
    );
}