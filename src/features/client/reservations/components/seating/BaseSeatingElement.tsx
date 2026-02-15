/**
 * @file BaseSeatingElement.tsx
 * Styled base unit for rendering seat map elements.
 */

import {cn} from "@/common/lib/utils.ts";
import {RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";
import SecondarySpan from "@/features/common/text/SecondarySpan.tsx";

type ElementType = "SELECTED" | "SEAT" | "STRUCTURE";

/**
 * Props for the BaseSeatingElement component.
 */
type ElementProps = {
    type: ElementType;
    label?: string;
    elementCSS?: string;
    labelCSS?: string;
}

/** Fixed seating element dimensions. */
const SIZE_CSS = "h-8 w-8";

/** Shared container styling for all seating elements. */
const CONTAINER_CSS = cn(RoundedBorderCSS, SIZE_CSS);

/** Variant-specific element and label colour tokens. */
const COLOUR_CSS: Record<ElementType, {element: string, label: string}> = {
    "SELECTED": {element: "bg-blue-600 dark:bg-blue-600", label: "text-white dark:text-white"},
    "SEAT": {element: "bg-gray-400 dark:bg-gray-600", label: "text-white dark:text-gray-300"},
    "STRUCTURE": {element: "bg-gray-200 dark:bg-gray-700", label: "text-black dark:text-gray-500"},
};

/**
 * Renders a styled seating element with optional label.
 */
const BaseSeatingElement = (
    {label, type, elementCSS, labelCSS}: ElementProps
) => {
    return (
        <div className={cn(
            CONTAINER_CSS,
            COLOUR_CSS[type].element,
            "flex items-center justify-center",
            elementCSS,
        )}>
            {
                label && (
                    <SecondarySpan className={cn(COLOUR_CSS[type].label, labelCSS)}>
                        {label}
                    </SecondarySpan>
                )
            }
        </div>
    );
};

export default BaseSeatingElement;
