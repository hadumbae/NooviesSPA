/**
 * @fileoverview A button component for a pagination bar that displays a page number or an ellipsis.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {PaginationEllipsis, PaginationItem, PaginationLink,} from "@/common/components/ui";

/** Props for the PaginationPageButton component. */
export type ButtonProps = {
    buttonValue: number | "...";
    activePage: number;
    onPageChange: (page: number) => void;
};

/** A pagination item that renders either a clickable page link or an ellipsis. */
export function PaginationPageButton(
    {buttonValue, activePage, onPageChange}: ButtonProps
): ReactElement {
    if (buttonValue === "...") {
        return (
            <PaginationItem>
                <PaginationEllipsis/>
            </PaginationItem>
        );
    }

    return (
        <PaginationItem>
            <PaginationLink
                onClick={() => onPageChange(buttonValue)}
                className={cn(
                    buttonValue === activePage && "text-black font-bold dark:text-white",
                    "text-neutral-400 dark:text-neutral-600",
                    "hover:cursor-pointer",
                )}
            >
                {buttonValue}
            </PaginationLink>
        </PaginationItem>
    );
}
