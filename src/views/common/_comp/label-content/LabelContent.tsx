/**
 * @fileoverview Layout component for rendering labeled content sections within cards.
 */

import {ReactElement, ReactNode} from 'react';
import {cn} from "@/common/_feat";
import {OrientationValues} from "@/common/_schemas";

type ContentClassNames = {
    label?: string;
    container?: string;
    content?: string;
};

type ContentProps = {
    children: ReactNode;
    label: string;
    orientation?: OrientationValues;
    classNames?: ContentClassNames;
}

const CSS_BY_ORIENTATION: Record<OrientationValues, string> = {
    "horizontal": "flex items-center space-x-4",
    "vertical": "flex flex-col space-y-0",
}

/** Renders a labelled section with configurable orientation and layout. */
export function LabelContent(
    {children, orientation = "vertical", classNames = {}, label}: ContentProps
): ReactElement {
    return (
        <div className={cn(CSS_BY_ORIENTATION[orientation], classNames?.container)}>
            <span className={cn("secondary-text uppercase text-xs select-none", classNames?.label)}>
                {label}
            </span>

            <div className={cn("flex-1", classNames?.content)}>
                {children}
            </div>
        </div>
    );
}