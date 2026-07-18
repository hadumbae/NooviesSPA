/**
 * @fileoverview Subtitle component for nested sections within subsections.
 */

import {ReactElement, ReactNode} from "react";
import {cn} from "@/common/_feat";
import {HeaderTag} from "@/common/_types";

/** Props for the SubsectionSubtitle component. */
type TitleProps = {
    children?: ReactNode;
    className?: string;
    as?: HeaderTag;
    text?: string;
};

/** Provides a consistent subtitle style for nested sections within a subsection. */
export function SubsectionSubtitle(
    {children, className, text, as: Tag = "h4"}: TitleProps
): ReactElement {
    return (
        <Tag className={cn("subsection-subtitle", className)}>
            {children ?? text}
        </Tag>
    );
}