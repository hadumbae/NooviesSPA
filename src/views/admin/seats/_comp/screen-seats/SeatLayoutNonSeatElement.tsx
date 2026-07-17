/**
 * @fileoverview Structural component for non-seat elements within the seat layout grid.
 */

import {ReactElement, ReactNode} from "react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";

/** Props for the SeatLayoutNonSeatElement component. */
type ElementProps = {
    children: ReactNode;
    className?: string;
};

/** Renders a structural, non-interactive element within the seat layout. */
export function SeatLayoutNonSeatElement(
    {children, className}: ElementProps
): ReactElement {
    return (
        <div className={cn("structural-element", className)}>
            {children}
        </div>
    );
}
