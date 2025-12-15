import {ReactNode} from "react";
import {NON_SEAT_ELEMENT_CSS}
    from "@/pages/seats/style/SeatLayoutCSS.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * @type SeatLayoutNonSeatElementProps
 * @description
 * Props for {@link SeatLayoutNonSeatElement}.
 */
type SeatLayoutNonSeatElementProps = {
    /**
     * Content rendered inside the non-seat element container.
     */
    children: ReactNode;

    /**
     * Optional additional CSS classes.
     */
    className?: string;
};

/**
 * @component SeatLayoutNonSeatElement
 * @description
 * Wrapper component for non-seat elements in a seat layout.
 *
 * Used for row labels, padding elements, or other structural items that
 * share common non-interactive styling.
 */
const SeatLayoutNonSeatElement = ({children, className}: SeatLayoutNonSeatElementProps) => {
    return (
        <div className={cn(NON_SEAT_ELEMENT_CSS, className)}>
            {children}
        </div>
    );
};

export default SeatLayoutNonSeatElement;
