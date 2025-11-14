import {FC} from "react";
import {cn} from "@/common/lib/utils.ts";
import {
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/common/components/ui/pagination.tsx";

/**
 * Props for {@link PaginationPageButton}.
 *
 * Represents the configuration of a single pagination button,
 * which may be a clickable page number or a non-clickable ellipsis.
 */
export type PaginationPageButtonProps = {
    /**
     * The page number that this button represents.
     *
     * Use `"..."` to display a non-clickable ellipsis placeholder
     * indicating skipped pages.
     */
    buttonValue: number | "...";

    /**
     * The currently active page number.
     * Used to visually differentiate the active page button.
     */
    activePage: number;

    /**
     * Callback invoked when a numbered page button is clicked.
     *
     * @param page - The page number to navigate to.
     */
    onPageChange: (page: number) => void;
};

/**
 * Renders a single item within a pagination control.
 *
 * Depending on the `page` prop, this component displays either:
 * - A **clickable numbered page button**, or
 * - A **non-interactive ellipsis indicator** when `page` is `"..."`.
 *
 * @component
 *
 * @example
 * ```tsx
 * <PaginationPageButton
 *   page={3}
 *   currentPage={2}
 *   setPage={(page) => console.log("Go to:", page)}
 * />
 * ```
 *
 * @remarks
 * - The active page button is highlighted using `text-black` and `font-bold`.
 * - Ellipsis placeholders render using {@link PaginationEllipsis}.
 * - This component is intended for internal use inside a higher-level
 *   `Pagination` component.
 */
const PaginationPageButton: FC<PaginationPageButtonProps> = ({buttonValue, activePage, onPageChange}) => {

    // ⚡ Ellipsis As Placeholder ⚡

    if (buttonValue === "...") {
        return (
            <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem>
        );
    }

    // ⚡ Standard Button ⚡

    return (
        <PaginationItem>
            <PaginationLink
                onClick={() => onPageChange(buttonValue)}
                className={cn(
                    "text-neutral-400 hover:cursor-pointer",
                    buttonValue === activePage && "text-black font-bold"
                )}
            >
                {buttonValue}
            </PaginationLink>
        </PaginationItem>
    );
};

export default PaginationPageButton;
