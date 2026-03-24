/**
 * @file High-level page component for the authenticated user's review dashboard.
 * @filename MyReviewsPage.tsx
 */

import {FC} from 'react';
import useParsedPaginationValue from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import MyReviewsLoader from "@/views/client/movie-reviews/components/loaders/MyReviewsLoader.tsx";
import MyReviewsPageContent from "@/views/client/users/pages/reviews-page/MyReviewsPageContent.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";

const REVIEWS_PER_PAGE = 10;

/**
 * Orchestrates the "My Reviews" page by managing title, pagination state, and data loading.
 */
const MyReviewsPage: FC = () => {
    useTitle("My Reviews");

    /** Syncs the current page number with the URL search parameters. */
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