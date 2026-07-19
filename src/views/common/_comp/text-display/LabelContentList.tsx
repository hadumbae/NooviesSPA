/**
 * @fileoverview A component for displaying a list of labeled text items in a description list format.
 */

import {Fragment, ReactElement, ReactNode} from "react";
import {cn} from "@/common/_feat";

/** An item containing a unique key, a label, and its corresponding text value. */
export type LabelContentItem = {
    key: string;
    label: string;
    content: ReactNode;
}

/** Custom class names for the list container and its child elements. */
type LabelTextClassNames = {
    list?: string;
    label?: string;
    content?: string;
}

/** Props for the LabelTextList component. */
type ListProps = {
    items: LabelContentItem[];
    classNames?: LabelTextClassNames;
};

/**
 * Renders a grid-based description list of labels and their associated text values.
 */
export function LabelContentList(
    {items, classNames}: ListProps
): ReactElement {
    return (
        <dl className={cn("label-list", classNames?.list)}>
            {items.map(({key, label, content}) => (
                <Fragment key={key}>
                    <dt className={cn("label-term", classNames?.label)}>{label}</dt>
                    <dd className={cn("label-desc", classNames?.content)}>{content}</dd>
                </Fragment>
            ))}
        </dl>
    );
}
