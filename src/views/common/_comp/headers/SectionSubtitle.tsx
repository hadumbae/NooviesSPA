/**
 * @fileoverview A reusable subtitle component for page sections.
 */

import {ReactElement, ReactNode} from "react";
import {cn} from "@/common/lib/utils.ts";
import {HeaderTag} from "@/common/type/HeaderTag.ts";

/** Props for the SectionSubtitle component. */
type TitleProps = {
    children?: ReactNode;
    className?: string;
    as?: HeaderTag;
    text?: string;
};

/** A semantic header component used for secondary titles within sections. */
export function SectionSubtitle(
    {children, className, text, as: Tag = "h3"}: TitleProps
): ReactElement {
    return (
        <Tag className={cn("section-subtitle", className)}>
            {children ?? text}
        </Tag>
    );
}