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

type PaginationButtonsProps = {
    page: number;
    perPage: number;
    totalItems: number;
    setPage: (page: string | number) => void;
}

const EllipsisPaginationButtons: FC<PaginationButtonsProps> = ({page, perPage, totalItems, setPage}) => {

    const numOfPages = Math.ceil(totalItems / perPage);
    console.log("Num Of Pages", numOfPages);

    const paginationRange = generatePaginationRange({currentPage: page, totalPages: numOfPages, siblingCount: 2});

    const prev = (prevNum: number) => setPage(page - prevNum);
    const next = (nextNum: number) => setPage(page + nextNum);

    return (
        <Pagination>
            <PaginationContent>
                {
                    page > 1 &&
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => prev(1)}
                            className={"text-neutral-400 hover:text-black cursor-pointer"}
                        />
                    </PaginationItem>
                }

                {
                    paginationRange.map((range, index) => <PaginationPageButton
                        key={`pagination-ellipsis-item-${index}`}
                        page={range}
                        currentPage={page}
                        setPage={setPage}
                    />)
                }

                {
                    page < numOfPages &&
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => next(1)}
                            className={"text-neutral-400 hover:text-black cursor-pointer"}
                        />
                    </PaginationItem>
                }
            </PaginationContent>
        </Pagination>
    );
};

export default EllipsisPaginationButtons;
