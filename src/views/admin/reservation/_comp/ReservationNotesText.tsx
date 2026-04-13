/**
 * @file Typography component for displaying administrative reservation notes.
 * @filename AdminNotesText.tsx
 */

import {ReactNode} from "react";
import {cn} from "@/common/lib/utils.ts";

/**
 * Properties for the {@link ReservationNotesText} component.
 */
type TextProps = {
    /** Nested elements to render within the notes container. Takes precedence over `text`. */
    children?: ReactNode;

    /**
     * Optional plain text content.
     * Convenient for simple note strings where complex nesting is unnecessary.
     */
    text?: string;

    /** Optional CSS classes for custom layout, sizing, or spacing overrides. */
    className?: string;
};

/**
 * A stylized text container designed specifically for rendering internal reservation notes.
 */
export const ReservationNotesText = (
    {children, text, className}: TextProps
) => {
    return (
        <p className={cn("primary-text text-justify border rounded-xl py-3 px-5", className)}>
            {children ?? text}
        </p>
    );
};