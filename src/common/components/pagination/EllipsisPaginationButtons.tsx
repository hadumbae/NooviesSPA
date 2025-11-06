import {FC} from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/common/components/ui/pagination.tsx";
import generatePaginationRange from "@/common/utility/features/pagination-buttons/generatePaginationRange.ts";
import PaginationPageButton from "@/common/components/pagination/PaginationPageButton.tsx";

/**
 * Props for the {@link EllipsisPaginationButtons} component.
 */
type PaginationButtonsProps = {
    /**
     * The currently active page index (1-based).
     */
    page: number;

    /**
     * Number of items displayed per page.
     */
    perPage: number;

    /**
     * Total number of items across all pages.
     */
    totalItems: number;

    /**
     * Callback function to update the current page.
     * Accepts either a numeric or string page index.
     *
     * @param page - The target page number or identifier.
     */
    setPage: (page: string | number) => void;
}

/**
 * A paginated navigation component that displays page buttons with ellipses
 * for large page ranges. Includes next and previous navigation controls.
 *
 * @example
 * ```tsx
 * <EllipsisPaginationButtons
 *   page={3}
 *   perPage={10}
 *   totalItems={250}
 *   setPage={(page) => console.log("Go to page:", page)}
 * />
 * ```
 *
 * @remarks
 * This component uses {@link generatePaginationRange} to compute a concise
 * list of visible page numbers and ellipses, providing a user-friendly pagination UI
 * for long lists.
 */
const EllipsisPaginationButtons: FC<PaginationButtonsProps> = ({page, perPage, totalItems, setPage}) => {

    /** Total number of pages calculated from total items and items per page. */
    const numOfPages = Math.ceil(totalItems / perPage);

    /** Range of visible page indices and ellipses to render. */
    const paginationRange = generatePaginationRange({
        currentPage: page,
        totalPages: numOfPages,
        siblingCount: 2
    });

    /**
     * Decrements the current page number.
     * @param prevNum - The number of pages to go backward.
     */
    const prev = (prevNum: number) => setPage(page - prevNum);

    /**
     * Increments the current page number.
     * @param nextNum - The number of pages to go forward.
     */
    const next = (nextNum: number) => setPage(page + nextNum);

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous page button (only visible if not on the first page) */}
                {
                    page > 1 &&
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => prev(1)}
                            className="text-neutral-400 hover:text-black cursor-pointer"
                        />
                    </PaginationItem>
                }

                {/* Render each visible page number or ellipsis */}
                {
                    paginationRange.map((range, index) => (
                        <PaginationPageButton
                            key={`pagination-ellipsis-item-${index}`}
                            page={range}
                            currentPage={page}
                            setPage={setPage}
                        />
                    ))
                }

                {/* Next page button (only visible if not on the last page) */}
                {
                    page < numOfPages &&
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => next(1)}
                            className="text-neutral-400 hover:text-black cursor-pointer"
                        />
                    </PaginationItem>
                }
            </PaginationContent>
        </Pagination>
    );
};

export default EllipsisPaginationButtons;
