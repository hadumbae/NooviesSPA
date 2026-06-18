/**
 * @fileoverview Main entry point for the Administrative Customer Review Moderation page.
 *
 */

import {CustomerReviewPageContent} from "@/views/admin/customers/customer-review-page/content.tsx";
import {PageLoader} from "@/views/common/_comp/page";
import {
    CustomerReviewViewData,
    useCustomerReviewRouteParams,
    useFetchCustomerReviewViewData
} from "@/domains/customers/_feat/movie-review";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {ReactElement} from "react";

/**
 * Orchestrates the data fetching and validation lifecycle for the Customer Review Moderation view.
 */
export function CustomerReviewPage(): ReactElement {
    const routeParams = useCustomerReviewRouteParams();
    if (!routeParams) return <PageLoader/>;

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
}