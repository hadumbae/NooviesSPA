/**
 * @fileoverview Typography component for displaying administrative reservation notes.
 */

import {ReactElement, ReactNode} from "react";
import {cn} from "@/common/_feat";

/** Props for the ReservationNotesText component. */
type TextProps = {
    children?: ReactNode;
    text?: string;
    className?: string;
};

/** A stylized text container designed specifically for rendering internal reservation notes. */
export function ReservationNotesText(
    {children, text, className}: TextProps
): ReactElement {
    return (
        <p className={cn("primary-text text-justify border rounded-xl py-3 px-5", className)}>
            {children ?? text}
        </p>
    );
}