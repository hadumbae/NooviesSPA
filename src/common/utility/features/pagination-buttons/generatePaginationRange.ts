/**
 * @file Generates condensed pagination ranges with ellipsis markers.
 * @filename generatePaginationRange.ts
 */

/**
 * Pagination items consisting of page numbers and ellipses.
 */
type PaginationRange = (number | "...")[];

/**
 * Parameters for generatePaginationRange.
 */
type PaginationRangeParams = {
    /** Active page (1-based) */
    activePage: number;

    /** Total available pages */
    totalPages: number;

    /** Visible sibling pages on each side of the active page */
    siblingCount: number;
};

/**
 * Produces a compact sequence of page numbers for pagination controls.
 */
export default function generatePaginationRange(
    params: PaginationRangeParams
): PaginationRange {
    const {activePage, totalPages, siblingCount = 1} = params;

    const pagesToShow = (siblingCount * 2) + 5;

    if (pagesToShow >= totalPages) {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    const leftSibling = Math.max(activePage - siblingCount, 1);
    const rightSibling = Math.min(activePage + siblingCount, totalPages);

    const showLeftEllipsis = leftSibling > 3;
    const showRightEllipsis = rightSibling < totalPages - 2;

    const paginationRange: PaginationRange = [];

    if (!showLeftEllipsis && showRightEllipsis) {
        const visibleLeftPages = 2 + 2 * siblingCount;
        for (let i = 1; i <= visibleLeftPages; i++) paginationRange.push(i);

        paginationRange.push("...");
        paginationRange.push(totalPages);
    }

    else if (showLeftEllipsis && !showRightEllipsis) {
        paginationRange.push(1);
        paginationRange.push("...");

        const visibleRightPages = 2 + 2 * siblingCount;
        for (let i = totalPages - visibleRightPages + 1; i <= totalPages; i++) paginationRange.push(i);
    }

    else if (showLeftEllipsis && showRightEllipsis) {
        paginationRange.push(1);
        paginationRange.push("...");

        for (let i = leftSibling; i <= rightSibling; i++) paginationRange.push(i);

        paginationRange.push("...");
        paginationRange.push(totalPages);
    }

    return paginationRange;
}