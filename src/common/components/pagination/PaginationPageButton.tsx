import {FC} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {PaginationEllipsis, PaginationItem, PaginationLink} from "@/common/components/ui/pagination.tsx";

type PageButtonProps = {
    page: number | "...";
    currentPage: number;
    setPage: (page: number | string) => void;
}

const PaginationPageButton: FC<PageButtonProps> = ({page, currentPage, setPage}) => {
    if (page === "...") {
        return <PaginationItem>
            <PaginationEllipsis/>
        </PaginationItem>;
    }

    return (
        <PaginationItem>
            <PaginationLink onClick={() => setPage(page)} className={cn(
                "text-neutral-400 hover:cursor-pointer",
                page === currentPage && "text-black font-bold"
            )}>
                {page}
            </PaginationLink>
        </PaginationItem>
    );
};

export default PaginationPageButton;
