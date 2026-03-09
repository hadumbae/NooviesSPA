/**
 * @file Compact pagination controls with range-based page buttons.
 * @filename PaginationRangeButtons.tsx
 */

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
 * Props for PaginationRangeButtons.
 */
export type PaginationRangeButtonsProps = {
    /** Active page (1-based) */
    page: number;

    /** Items per page */
    perPage: number;

    /** Total items across all pages */
    totalItems: number;

    /** Updates the active page */
    setPage: (page: number) => void;
};

/**
 * Renders navigable pagination with condensed page ranges.
 */
const PaginationRangeButtons: FC<PaginationRangeButtonsProps> = ({page, perPage, totalItems, setPage}) => {
    if (perPage >= totalItems) return null;

    const totalPages = Math.ceil(totalItems / perPage);
    const paginationRange = generatePaginationRange({totalPages, activePage: page, siblingCount: 2});

    const prev = (step: number) => setPage(page - step);
    const next = (step: number) => setPage(page + step);

    return (
        <Pagination>
            <PaginationContent>
                {
                    page > 1 &&
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => prev(1)}
                            className="text-neutral-400 hover:text-black cursor-pointer"
                        />
                    </PaginationItem>
                }

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