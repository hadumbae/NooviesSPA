/**
 * @fileoverview Page component for viewing customer movie review logs.
 */

import {ReactElement} from "react";
import {CustomerReviewLogsPageContent} from "@/views/admin/customers/_pages/customer-review-logs-page/content.tsx";
import {useFetchCustomerReviewLogsViewData} from "@/domains/customers/_feat/movie-review-logs";
import {useParsedPaginationValue} from "@/common/_feat/fetch-pagination-search-params";
import {QueryDataLoader} from "@/views/common/_feat";
import {useRouteParams} from "@/common/_feat";
import {CustomerReviewRouteParamsSchema} from "@/domains/customers";

const LOGS_PER_PAGE = 20;

/**
 * Page controller that fetches and displays moderation audit logs for a specific review.
 */
export function CustomerReviewLogsPage(): ReactElement {
    const {customerID, reviewID} = useRouteParams({
        schema: CustomerReviewRouteParamsSchema,
        errorConfig: {
            message: "Invalid Route Params for Customer Reviews",
            description: "Valid Customer ID Is Required."
        }
    });

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchCustomerReviewLogsViewData({
        pagination: {page, perPage: LOGS_PER_PAGE},
        customerID,
        reviewID,
    });

    return (
        <QueryDataLoader query={query}>
            {({customer, review, logs: {items, totalItems}}) => (
                <CustomerReviewLogsPageContent
                    customer={customer}
                    review={review}
                    logs={items}
                    pagination={{
                        page,
                        perPage: LOGS_PER_PAGE,
                        totalItems,
                        setPage
                    }}
                />
            )}
        </QueryDataLoader>
    );
}