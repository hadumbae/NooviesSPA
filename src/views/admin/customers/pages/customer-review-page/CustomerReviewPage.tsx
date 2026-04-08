/**
 * @file Main entry point for the Administrative Customer Review Moderation page.
 * @filename CustomerReviewPage.tsx
 */

import {
    CustomerReviewPageContent
} from "@/views/admin/customers/pages/customer-review-page/CustomerReviewPageContent.tsx";
import {useCustomerReviewRouteParams} from "@/domains/customers/features/movie-review/hooks";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {useFetchCustomerReviewViewData} from "@/domains/customers/features/movie-review/fetch";
import {CustomerReviewViewData, CustomerReviewViewSchema} from "@/domains/customers/features/movie-review/schemas";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

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
        <ValidatedDataLoader query={query} schema={CustomerReviewViewSchema}>
            {({review, customer}: CustomerReviewViewData) => (
                <CustomerReviewPageContent
                    customer={customer}
                    review={review}
                />
            )}
        </ValidatedDataLoader>
    );
};