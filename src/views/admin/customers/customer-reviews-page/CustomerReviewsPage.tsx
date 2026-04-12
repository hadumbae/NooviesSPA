/**
 * @fileoverview Defines the CustomerReviewsPage component which manages the
 * data fetching and pagination state for displaying a customer's movie reviews.
 */

import {useParsedPaginationValue} from "@/common/features/fetch-pagination-search-params";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchCustomerCode} from "@/domains/users/utils/fetch-customer-code/useFetchCustomerCode.ts";
import {
    CustomerReviewsPageContent
} from "@/views/admin/customers/customer-reviews-page/CustomerReviewsPageContent.tsx";
import {Loader} from "lucide-react";
import {useFetchCustomerReviewsViewData} from "@/domains/customers/features/movie-reviews";

/** Number of reviews to display per page. */
const REVIEWS_PER_PAGE = 10;

/**
 * Renders the customer reviews page by fetching customer details and reviews
 * based on the current URL pagination parameters and customer code.
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