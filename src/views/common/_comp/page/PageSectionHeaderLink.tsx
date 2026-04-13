/**
 * @fileoverview A navigational header component that wraps section titles in a link.
 * Combines semantic header tags with tracking-enabled navigation, featuring
 * a visual indicator (chevron) to signify interactive sections.
 */

import {ReactElement, ReactNode} from "react";
import {HeaderTag} from "@/common/type/HeaderTag.ts";
import {cn} from "@/common/lib/utils.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {LinkProps} from "react-router-dom";
import {ChevronRight} from "lucide-react";

/**
 * Props for the PageSectionHeaderLink component.
 * Extends standard React Router LinkProps to support all navigation features.
 */
type SectionProps = LinkProps & {
    /** The content to be rendered inside the header tag. */
    children?: ReactNode;
    /** Optional fallback text if children are not provided. */
    text?: string;
    /** The semantic HTML header tag to render (h1-h6). Defaults to h1. */
    as?: HeaderTag;
    /** Optional CSS classes specifically for the underlying anchor (LoggedLink) element. */
    linkClasName?: string;
};

/**
 * Renders a semantic header wrapped in a logged-link for consistent page section navigation.
 * Automatically appends a ChevronRight icon and applies "group" styles for hover state synchronization.
 */
export function PageSectionHeaderLink(
    {children, text, className, linkClasName, as: Tag = "h1", ...linkProps}: SectionProps
): ReactElement {
    return (
        <LoggedLink
            {...linkProps}
            className={cn("group block w-fit", linkClasName)}
        >
            <Tag className={cn(
                "section-header-visual section-header-link",
                className
            )}>
                {children ?? text} <ChevronRight/>
            </Tag>
        </LoggedLink>
    );
}