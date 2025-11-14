/**
 * Represents the pagination items to display.
 *
 * Can include page numbers and ellipsis ("...") for skipped ranges.
 */
type PaginationRange = (number | "...")[];

/**
 * Parameters required to generate a pagination range.
 */
type PaginationRangeParams = {
    /** The currently active page (1-indexed). */
    activePage: number;
    /** Total number of pages available. */
    totalPages: number;
    /** Number of sibling pages to display on each side of the current page. Defaults to 1. */
    siblingCount: number;
};

/**
 * Generates a pagination range for UI components, including page numbers and ellipses.
 *
 * This function ensures:
 * - The current page and its siblings are always shown.
 * - First and last pages are always included.
 * - Ellipses ("...") are used to condense long ranges.
 *
 * @param params - Object containing `currentPage`, `totalPages`, and `siblingCount`.
 * @returns An array of page numbers and/or ellipses for pagination display.
 *
 * @example
 * ```ts
 * generatePaginationRange({ currentPage: 5, totalPages: 10, siblingCount: 1 });
 * // [1, "...", 4, 5, 6, "...", 10]
 * ```
 */
export default function generatePaginationRange(params: PaginationRangeParams): PaginationRange {
    const {activePage, totalPages, siblingCount = 1} = params;

    // ⚡ Total Number Of Buttons To Show ⚡

    const pagesToShow = (siblingCount * 2) + 5;

    // ⚡ Show All Pages If Within Range ⚡

    if (pagesToShow >= totalPages) {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    // ⚡ Determine The Siblings Around The Active Page ⚡

    const leftSibling = Math.max(activePage - siblingCount, 1);
    const rightSibling = Math.min(activePage + siblingCount, totalPages);

    // ⚡ Determine Ellipses Visibility ⚡

    const showLeftEllipsis = leftSibling > 3;
    const showRightEllipsis = rightSibling < totalPages - 2;

    // ⚡ Build Range ⚡

    const paginationRange: PaginationRange = [];

    // ⚡ Active On The Left ⚡

    if (!showLeftEllipsis && showRightEllipsis) {
        const visibleLeftPages = 2 + 2 * siblingCount;
        for (let i = 1; i <= visibleLeftPages; i++) paginationRange.push(i);

        paginationRange.push("...");
        paginationRange.push(totalPages);
    }

    // ⚡ Active On The Right ⚡

    else if (showLeftEllipsis && !showRightEllipsis) {
        paginationRange.push(1);
        paginationRange.push("...");

        const visibleRightPages = 2 + 2 * siblingCount;
        for (let i = totalPages - visibleRightPages + 1; i <= totalPages; i++) paginationRange.push(i);
    }

    // ⚡ Active In The Centre ⚡

    else if (showLeftEllipsis && showRightEllipsis) {
        paginationRange.push(1);
        paginationRange.push("...");

        for (let i = leftSibling; i <= rightSibling; i++) paginationRange.push(i);

        paginationRange.push("...");
        paginationRange.push(totalPages);
    }

    return paginationRange;
}
