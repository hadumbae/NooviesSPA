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
 * Props for the {@link PaginationRangeButtons} component.
 */
export type PaginationRangeButtonsProps = {
    /**
     * The currently active page (1-based index).
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
     *
     * @param page - The page number to navigate to.
     */
    setPage: (page: number) => void;
};

/**
 * `PaginationRangeButtons` renders a full pagination control with:
 * - Clickable page numbers
 * - Ellipses for skipped pages
 * - Previous and Next navigation buttons
 *
 * The component automatically calculates the total number of pages
 * and displays a concise set of page buttons using
 * {@link generatePaginationRange}.
 *
 * @component
 *
 * @example
 * ```tsx
 * <PaginationRangeButtons
 *   page={3}
 *   perPage={10}
 *   totalItems={250}
 *   setPage={(page) => console.log("Navigate to page:", page)}
 * />
 * ```
 *
 * @remarks
 * - Previous and Next buttons are conditionally rendered based on the current page.
 * - Designed for long lists where a full range of page numbers would be too cluttered.
 * - Uses {@link PaginationPageButton} internally for each page or ellipsis item.
 */
const PaginationRangeButtons: FC<PaginationRangeButtonsProps> = ({page, perPage, totalItems, setPage}) => {

    // ⚡ Total Number of Pages ⚡

    const totalPages = Math.ceil(totalItems / perPage);

    // ⚡ Pagination Range ⚡

    const paginationRange = generatePaginationRange({totalPages, activePage: page, siblingCount: 2});

    // ⚡ On Click ⚡

    const prev = (prevNum: number) => setPage(page - prevNum);
    const next = (nextNum: number) => setPage(page + nextNum);

    return (
        <Pagination>
            <PaginationContent>

                {/* Previous Page Button (if not on the first page) */}

                {
                    page > 1 &&
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => prev(1)}
                            className="text-neutral-400 hover:text-black cursor-pointer"
                        />
                    </PaginationItem>
                }

                {/* Page / Ellipsis Buttons */}

                {
                    paginationRange.map((pageValue, index) => (
                        <PaginationPageButton
                            key={`pagination-ellipsis-item-${index}`}
                            buttonValue={pageValue}
                            activePage={page}
                            onPageChange={setPage}
                        />
                    ))
                }

                {/* Next Page Button (if not on the first page) */}

                {
                    page < totalPages &&
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

export default PaginationRangeButtons;
