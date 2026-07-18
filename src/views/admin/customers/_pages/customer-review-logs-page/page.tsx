/**
 * @fileoverview Page component for viewing customer movie review logs.
 *
 */

import {ReactElement} from "react";
import {CustomerReviewLogsPageContent} from "@/views/admin/customers/_pages/customer-review-logs-page/content.tsx";
import {
    useCustomerReviewLogsRouteParams,
    useFetchCustomerReviewLogsViewData
} from "@/domains/customers/_feat/movie-review-logs";
import {PageLoader} from "@/views/common/_comp/page";
import {useParsedPaginationValue} from "@/common/_feat/fetch-pagination-search-params";
import {QueryDataLoader} from "@/views/common/_feat";

const LOGS_PER_PAGE = 20;

/**
 * Page controller that fetches and displays moderation audit logs for a specific review.
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