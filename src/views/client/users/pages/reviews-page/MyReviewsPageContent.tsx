import {PopulatedMovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";

type ContentProps = {
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    totalItems: number;
    reviews: PopulatedMovieReview[];
}

const MyReviewsPageContent = (
    {reviews, ...paginationProps}: ContentProps
) => {
    return (
        <PageFlexWrapper>
            <div>
                <h1>Header</h1>
            </div>

            <PaginationRangeButtons {...paginationProps}/>
        </PageFlexWrapper>
    );
};

export default MyReviewsPageContent;
