/**
 * @fileoverview A reusable header component for defining sections within the application layout.
 */

import {ReactElement, ReactNode} from "react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {HeaderTag} from "@/common/type/HeaderTag.ts";

/** Props for the SectionTitle component. */
type TitleProps = {
    children?: ReactNode;
    className?: string;
    as?: HeaderTag;
    text?: string;
};

/**
 * Renders a semantic section header with configurable HTML tags and styling.
 */
export function SectionTitle(
    {children, className, text, as: Tag = "h2"}: TitleProps
): ReactElement {
    return (
        <Tag className={cn("section-title", className)}>
            {children ?? text}
        </Tag>
    );
}