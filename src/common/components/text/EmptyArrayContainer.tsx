/** @fileoverview Presentational component for displaying an empty-state message. */

import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

/** Props for the EmptyArrayContainer component. */
type ContainerProps = {
    text?: string;
    className?: string;
};

/** Renders a centered, stylized message indicating an empty collection state. */
export function EmptyArrayContainer(
    {text, className}: ContainerProps
): ReactElement {
    return (
        <div className={cn("flex justify-center items-center", className)}>
            <span className="secondary-text uppercase italic select-none text-sm">
                {text ?? "There Are No Items"}
            </span>
        </div>
    );
}