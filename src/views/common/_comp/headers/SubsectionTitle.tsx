/**
 * @fileoverview A typography component for rendering subsection headers with flexible HTML semantics.
 */

import {ReactElement, ReactNode} from "react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {HeaderTag} from "@/common/type/HeaderTag.ts";

/** Props for the SubsectionTitle component. */
type TitleProps = {
    children?: ReactNode;
    className?: string;
    as?: HeaderTag;
    text?: string;
};

/**
 * Renders a stylised header text using a configurable HTML heading tag.
 */
export function SubsectionTitle(
    {children, className, text, as: Tag = "h3"}: TitleProps
): ReactElement {
    return (
        <Tag className={cn("subsection-title", className)}>
            {children ?? text}
        </Tag>
    );
}