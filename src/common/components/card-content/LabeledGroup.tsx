/**
 * @file LabeledGroup.tsx
 * @description
 * Layout component for rendering a small uppercase label alongside
 * arbitrary content in a horizontal row.
 */

import {ReactNode} from "react";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for {@link LabeledGroup}.
 */
type GroupProps = {
    /**
     * Content rendered to the right of the label.
     */
    children: ReactNode;

    /**
     * Text label displayed on the left.
     */
    label: string;

    /**
     * Optional class name applied to the root container.
     */
    className?: string;
};

/**
 * Renders a labeled row with a fixed-style label and flexible content area.
 *
 * Commonly used for summary or metadata lists where a label/value
 * layout is required.
 *
 * @param props - Component props.
 *
 * @example
 * ```tsx
 * <LabeledGroup label="Genres">
 *   <span>Drama • Thriller</span>
 * </LabeledGroup>
 * ```
 */
const LabeledGroup = (props: GroupProps) => {
    const {children, label, className} = props;

    return (
        <div className={cn("flex items-center space-x-4", className)}>
            <span
                className={cn(
                    SecondaryTextBaseCSS,
                    "uppercase text-[12px] select-none"
                )}
            >
                {label}
            </span>

            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default LabeledGroup;
