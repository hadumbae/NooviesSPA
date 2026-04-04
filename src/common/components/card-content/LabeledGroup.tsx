/**
 * @file A structural layout component for rendering a descriptive label paired with content.
 * @filename LabeledGroup.tsx
 */

import {ReactNode} from "react";
import {cn} from "@/common/lib/utils.ts";
import {OrientationValues} from "@/common/schema/enums/OrientationEnumSchema.ts";

/**
 * Props for the {@link LabeledGroup} component.
 */
type GroupProps = {
    /** The value, text, or interactive element to be described by the label. */
    children: ReactNode;

    /** The descriptive text displayed as a small uppercase header or prefix. */
    label: string;

    /** Optional additional CSS classes for the root container (e.g., margins, grid-spanning). */
    className?: string;

    /** * Determines the flex direction and alignment of the label and its content.
     * @default "horizontal"
     */
    orientation?: OrientationValues;
};

/**
 * Renders a standardized "Label: Value" pair with support for responsive layouts.
 */
const LabeledGroup = (props: GroupProps) => {
    const {children, className, label, orientation = "horizontal"} = props;

    return (
        <div className={cn(
            "flex",
            orientation === "horizontal" && "items-center space-x-4",
            orientation === "vertical" && "flex-col space-y-0",
            className
        )}>
            <span className="secondary-text uppercase text-xs lg:text-sm select-none">
                {label}
            </span>

            <div className="primary-text flex-1">
                {children}
            </div>
        </div>
    );
};

export default LabeledGroup;