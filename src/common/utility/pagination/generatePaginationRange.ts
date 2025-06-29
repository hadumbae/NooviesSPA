type PaginationRange = (number | "...")[];

type PaginationRangeParams = {
    currentPage: number;
    totalPages: number;
    siblingCount: number;
}

export default function generatePaginationRange(params: PaginationRangeParams): PaginationRange {
    const {currentPage, totalPages, siblingCount = 1} = params;

    const pagesToShow = (siblingCount * 2) + 5;

    if (pagesToShow >= totalPages) {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSibling > 3;
    const showRightEllipsis = rightSibling < totalPages - 2;

    const paginationRange: PaginationRange = [];

    if (!showLeftEllipsis && showRightEllipsis) {
        const leftItemCount = 2 + 2 * siblingCount;
        for (let i = 1; i <= leftItemCount; i++) paginationRange.push(i);
        paginationRange.push("...");
        paginationRange.push(totalPages);
    } else if (showLeftEllipsis && !showRightEllipsis) {
        paginationRange.push(1);
        paginationRange.push("...");

        const rightItemCount = 2 + 2 * siblingCount;
        for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) paginationRange.push(i);
    } else if (showLeftEllipsis && showRightEllipsis) {
        paginationRange.push(1);
        paginationRange.push("...");

        for (let i = leftSibling; i <= rightSibling; i++) paginationRange.push(i);

        paginationRange.push("...");
        paginationRange.push(totalPages);
    }

    return paginationRange;
}