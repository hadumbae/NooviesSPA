/**
 * @fileoverview A component for rendering a horizontal list of badge elements.
 */

import {ReactElement} from "react";
import {Badge, BadgeProps} from "@/common/components/ui";
import {cn} from "@/common/_feat";

/** Represents an individual entry in the badge list. */
export type BadgeEntry = {
    key: string;
    text: string;
}

/** Custom class names for the badge list container and individual badges. */
type ListClassNames = {
    list?: string;
    badge?: string;
}

/** Props for the BadgeList component. */
type ListProps = Omit<BadgeProps, "className"> & {
    entries: BadgeEntry[];
    classNames?: ListClassNames;
};

/**
 * Renders a collection of badges with consistent spacing and shared properties.
 */
export function BadgeList(
    {classNames, entries, ...props}: ListProps
): ReactElement {
    return (
        <div className={cn("flex flex-wrap space-x-2", classNames?.list)}>
            {entries.map(({key, text}) => (<Badge {...props} key={key}>{text}</Badge>))}
        </div>
    );
}