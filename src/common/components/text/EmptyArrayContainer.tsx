/**
 * @file EmptyArrayContainer.tsx
 *
 * Presentational component for displaying an empty-state
 * message when a list or collection has no items.
 */

import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

type ContainerProps = {
    /** Optional text to display as the empty-state message */
    text?: string;

    /** Optional class name overrides for the container */
    className?: string;
};

/**
 * Renders a centered, stylized message indicating
 * an empty collection state.
 */
const EmptyArrayContainer = ({text, className}: ContainerProps) => {
    return (
        <div className={cn("flex justify-center items-center", className)}>
            <span
                className={cn(
                    "uppercase italic select-none text-sm",
                    SecondaryTextBaseCSS
                )}
            >
                {text ?? "There Are No Items"}
            </span>
        </div>
    );
};

export default EmptyArrayContainer;
