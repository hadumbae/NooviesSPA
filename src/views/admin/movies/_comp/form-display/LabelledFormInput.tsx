/**
 * @fileoverview A layout component that pairs a form input with a stylized label.
 */

import {ReactElement, ReactNode} from "react";
import {cn} from "@/common/_feat";

/** Custom class names for the container and label elements. */
type GroupClassNames = {
    container?: string;
    label?: string;
    input?: string;
}

/** Props for the LabelledFormInput component. */
type LabelProps = {
    children: ReactNode;
    label: string;
    classNames?: GroupClassNames;
};

/** A wrapper component that renders a label alongside its children in a flex container. */
export function LabelledFormInput(
    {children, label, classNames}: LabelProps
): ReactElement {
    return (
        <div className={cn("space-x-2 flex items-center", classNames?.container)}>
            <span className={cn("primary-text font-bold text-sm", classNames?.label)}>{label}</span>
            <div className={cn("flex-1", classNames?.input)}>
                {children}
            </div>
        </div>
    );
}