/**
 * @fileoverview A display component for a numeric statistic paired with a label.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";

/** Custom class names for the StatNumberItem sub-elements. */
type ItemClassNames = {
    container?: string;
    text?: string;
    number?: string;
}

/** Props for the StatNumberItem component. */
type ItemProps = {
    count: number;
    text: string;
    classNames?: ItemClassNames;
};

/** A component that renders a large number and a descriptive label using description list tags. */
export function StatNumberItem(
    {count, text, classNames}: ItemProps
): ReactElement {
    return (
        <dl className={cn("space-y-1", classNames?.container)}>
            <dt className={cn("primary-text text-lg  md:text-2xl font-extrabold", classNames?.number)}>{count}</dt>
            <dd className={cn("secondary-text text-xs md:text-sm font-bold", classNames?.text)}>{text}</dd>
        </dl>
    );
}