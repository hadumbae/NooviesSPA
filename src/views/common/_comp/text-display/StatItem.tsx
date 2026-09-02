/**
 * @fileoverview Presentational component for displaying individual statistical metrics with labels.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";

type ItemClassNames = {
    container?: string;
    label?: string;
    text?: string;
}

/** Props for the StatItem component. */
type ItemProps = {
    text: string;
    label: string;
    classNames?: ItemClassNames;
};

/** Displays a styled statistical value and corresponding descriptive label. */
export function StatItem(
    {text, label, classNames}: ItemProps
): ReactElement {
    return (
        <dl className={cn("default-card p-3 space-y-1 hover:shadow-md", classNames?.container)}>
            <dt className={cn("text-right primary-text text-lg  md:text-2xl font-extrabold", classNames?.text)}>{text}</dt>
            <dd className={cn("text-left secondary-text text-xs md:text-sm font-bold", classNames?.label)}>{label}</dd>
        </dl>
    );
}