/**
 * @fileoverview Main page component for viewing customer movie review logs.
 * Orchestrates route parameter extraction, paginated data fetching, and
 * view rendering.
 */

import {ReactElement} from "react";
import {CustomerReviewLogsPageContent} from "@/views/admin/customers/customer-review-logs-page/content.tsx";
import {
    useCustomerReviewLogsRouteParams,
    useFetchCustomerReviewLogsViewData
} from "@/domains/customers/features/movie-review-logs";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {useParsedPaginationValue} from "@/common/features/fetch-pagination-search-params";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";

const LOGS_PER_PAGE = 20;

/**
 * High-level page controller that handles the logic for fetching moderation
 * audit logs for a specific review based on URL parameters.
 */
export function CustomerReviewLogsPage(): ReactElement {
    const routeParams = useCustomerReviewLogsRouteParams();
    const {reviewCode, uniqueCode} = routeParams ?? {};

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchCustomerReviewLogsViewData({
        customerCode: uniqueCode!,
        reviewCode: reviewCode!,
        pagination: {page, perPage: LOGS_PER_PAGE},
        options: {enabled: !!routeParams},
    });

    if (!routeParams) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {({items, totalItems}) => (
                <CustomerReviewLogsPageContent
                    customerCode={uniqueCode!}
                    reviewCode={reviewCode!}
                    page={page}
                    perPage={LOGS_PER_PAGE}
                    setPage={setPage}
                    logs={items}
                    totalItems={totalItems}
                />
            )}
        </QueryDataLoader>
    );
}