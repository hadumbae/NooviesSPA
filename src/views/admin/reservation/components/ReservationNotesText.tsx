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
    /** The content to be rendered within the notes container. */
    children: ReactNode;
    /** Optional CSS classes for custom layout or spacing overrides. */
    className?: string;
};

/**
 * A stylized text container used specifically for rendering reservation-related notes.
 */
export const ReservationNotesText = (
    {children, className}: TextProps
) => {
    return (
        <p className={cn("primary-text text-justify border rounded-xl py-3 px-5", className)}>
            {children}
        </p>
    );
};