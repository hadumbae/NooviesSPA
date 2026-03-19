import {FC} from 'react';
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import MyReviewsLoader from "@/views/client/movie-reviews/components/loaders/MyReviewsLoader.tsx";
import MyReviewsPageContent from "@/views/client/users/pages/reviews-page/MyReviewsPageContent.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";

const REVIEWS_PER_PAGE = 20;

const MyReviewsPage: FC = () => {
    useTitle("My Reviews");

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    return (
        <MyReviewsLoader page={page} perPage={REVIEWS_PER_PAGE}>
            {({totalItems, items}) => (
                <MyReviewsPageContent
                    page={page}
                    perPage={REVIEWS_PER_PAGE}
                    setPage={setPage}
                    reviews={items}
                    totalItems={totalItems}
                />
            )}
        </MyReviewsLoader>
    );
};

export default MyReviewsPage;
