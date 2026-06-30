/**
 * @fileoverview Styled base unit for rendering seat map elements.
 */

import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

/** Category of seating element determining its visual style. */
export type ElementType = "SELECTED" | "SEAT" | "STRUCTURE";

/** Props for the BaseSeatingElement component. */
export type ElementProps = {
    type: ElementType;
    label?: string;
    elementCSS?: string;
    labelCSS?: string;
}

/** Variant-specific element and label colour tokens. */
const COLOUR_CSS: Record<ElementType, { element: string, label: string }> = {
    "SELECTED": {element: "bg-blue-600 dark:bg-blue-600", label: "text-white dark:text-white"},
    "SEAT": {element: "bg-gray-400 dark:bg-gray-600", label: "text-white dark:text-gray-300"},
    "STRUCTURE": {element: "bg-gray-200 dark:bg-gray-700", label: "text-black dark:text-gray-500"},
};

/** Renders a styled seating element with an optional label. */
export function BaseSeatingElement(
    {label, type, elementCSS, labelCSS}: ElementProps
): ReactElement {
    return (
        <div className={cn(
            COLOUR_CSS[type].element,
            "flex items-center justify-center rounded-container-border h-8 w-8",
            elementCSS,
        )}>
            {
                label && (
                    <span className={cn("secondary-text", COLOUR_CSS[type].label, labelCSS)}>
                        {label}
                    </span>
                )
            }
        </div>
    );
}


