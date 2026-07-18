/**
 * @fileoverview Styled span component for displaying a placeholder "None" text.
 */

import {cn} from "@/common/_feat";
import {ComponentPropsWithoutRef, ReactElement} from "react";

/** A styled span component that displays the text "None" for empty or null values. */
export function NoneSpan(
    {className, ...rem}: ComponentPropsWithoutRef<"span">
): ReactElement {
    return (
        <span {...rem} className={cn("secondary-text select-none italic", className)}>
            None
        </span>
    );
}