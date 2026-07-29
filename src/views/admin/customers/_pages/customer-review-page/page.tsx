/**
 * @fileoverview Main entry point for the Administrative Customer Review Moderation page.
 *
 */

import {QueryDataLoader} from "@/views/common/_feat";
import {ReactElement} from "react";
import {useRouteParams} from "@/common/_feat";
import {CustomerReviewPageContent} from "@/views/admin/customers/_pages/customer-review-page/content.tsx";
import {
    CustomerReviewRouteParamsSchema,
    CustomerReviewViewData,
    useFetchCustomerReviewViewData
} from "@/domains/customers/_feat/movie-review";

/**
 * Orchestrates the data fetching and validation lifecycle for the Customer Review Moderation view.
 */
export function CustomerReviewPage(): ReactElement {
    const {customerID, reviewID} = useRouteParams({
        schema: CustomerReviewRouteParamsSchema,
        errorConfig: {description: "Valid Customer ID And Review ID Are Required."},
    });

    const query = useFetchCustomerReviewViewData({customerID, reviewID});

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