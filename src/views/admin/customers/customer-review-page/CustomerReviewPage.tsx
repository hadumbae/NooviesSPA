/**
 * @file Main entry point for the Administrative Customer Review Moderation page.
 * @filename CustomerReviewPage.tsx
 */

import {
    CustomerReviewPageContent
} from "@/views/admin/customers/customer-review-page/CustomerReviewPageContent.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {useFetchCustomerReviewViewData} from "@/domains/customers/features/movie-review/fetch";
import {CustomerReviewViewData} from "@/domains/customers/features/movie-review/schemas";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useCustomerReviewRouteParams} from "@/domains/customers/features/movie-review/hooks";

/**
 * Orchestrates the data fetching and validation lifecycle for the Review Moderation view.
 * ---
 */
export const CustomerReviewPage = () => {
    const routeParams = useCustomerReviewRouteParams();
    if (!routeParams) return <PageLoader />;

    const {reviewCode, uniqueCode} = routeParams;

    const query = useFetchCustomerReviewViewData({
        customerCode: uniqueCode,
        reviewCode,
    });

    return (
        <QueryDataLoader query={query}>
            {({review, customer}: CustomerReviewViewData) => (
                <CustomerReviewPageContent
                    customer={customer}
                    review={review}
                />
            )}
        </QueryDataLoader>
    );
};