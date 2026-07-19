/**
 * @fileoverview Component for rendering a range of pagination buttons with next and previous controls.
 */

import {ReactElement} from 'react';
import {generatePaginationRange} from "@/common/_feat";
import {PaginationPageButton} from "@/views/common/_comp/pagination-buttons/PaginationPageButton.tsx";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/views/common/_comp/ui";

/** Props for the PaginationRangeButtons component. */
export type PaginationRangeButtonsProps = {
    page: number;
    perPage: number;
    totalItems: number;
    setPage: (page: number) => void;
};

/** Renders a pagination control bar with dynamic page number buttons and directional navigation. */
export function PaginationRangeButtons(
    {page, perPage, totalItems, setPage}: PaginationRangeButtonsProps
): ReactElement | null {
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
}
