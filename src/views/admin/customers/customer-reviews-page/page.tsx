/**
 * @fileoverview Manages data fetching and pagination state for displaying a customer's movie reviews.
 */

import {useParsedPaginationValue} from "@/common/_feat/fetch-pagination-search-params";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {
    CustomerReviewsPageContent
} from "@/views/admin/customers/customer-reviews-page/content.tsx";
import {Loader} from "lucide-react";
import {useFetchCustomerReviewsViewData} from "@/domains/customers/_feat/movie-reviews";
import {useFetchCustomerCode} from "@/domains/users";

/** Number of reviews to display per page. */
const REVIEWS_PER_PAGE = 10;

/**
 * Renders the customer reviews page using URL pagination parameters and the customer code.
 */
export function CustomerReviewsPage() {
    const customerCode = useFetchCustomerCode();

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchCustomerReviewsViewData({
        customerCode: customerCode!,
        pagination: {page, perPage: REVIEWS_PER_PAGE},
        options: {enabled: !!customerCode},
    });

    if (!customerCode) {
        return <Loader/>;
    }

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