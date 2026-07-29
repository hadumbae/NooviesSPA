/**
 * @fileoverview Manages data fetching and pagination state for displaying a customer's movie reviews.
 */

import {useParsedPaginationValue} from "@/common/_feat/fetch-pagination-search-params";
import {QueryDataLoader} from "@/views/common/_feat";
import {CustomerReviewsPageContent} from "@/views/admin/customers/_pages/customer-reviews-page/content.tsx";
import {
    CustomerReviewsRouteParamsSchema,
    useFetchCustomerReviewsViewData
} from "@/domains/customers/_feat/movie-reviews";
import {useRouteParams} from "@/common/_feat";

/** Number of reviews to display per page. */
const REVIEWS_PER_PAGE = 10;

/**
 * Renders the customer reviews page using URL pagination parameters and the customer code.
 */
export function CustomerReviewsPage() {
    const {customerID} = useRouteParams({
        schema: CustomerReviewsRouteParamsSchema,
        errorConfig: {description: "Valid Customer ID Is Required."},
    });

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchCustomerReviewsViewData({
        pagination: {page, perPage: REVIEWS_PER_PAGE},
        customerID,
    });

    return (
        <QueryDataLoader query={query}>
            {({customer, reviews: {items, totalItems}}) => (
                <CustomerReviewsPageContent
                    customer={customer}
                    reviews={items}
                    totalItems={totalItems}
                    page={page}
                    perPage={REVIEWS_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}