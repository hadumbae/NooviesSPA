/**
 * @fileoverview Layout and presentation logic for the Customer Review Logs page.
 */

import {ReactElement} from "react";
import {UserUniqueCode} from "@/domains/users";
import {MovieReviewModerationLog, MovieReviewUniqueCode} from "@/domains/movie-reviews";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {PaginationRangeButtons} from "@/views/common/_comp";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {CustomerReviewLogCard} from "@/views/admin/customers/_comp";
import {CustomerReviewLogsPageHeader} from "@/views/admin/customers/_pages/customer-review-logs-page/sections";

/** Props for the CustomerReviewLogsPageContent component. */
type ContentProps = {
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    logs: MovieReviewModerationLog[];
    totalItems: number;
    customerCode: UserUniqueCode;
    reviewCode: MovieReviewUniqueCode;
};

/**
 * Primary content area for review logs that displays a grid of log cards and pagination.
 */
export function CustomerReviewLogsPageContent(
    {logs, reviewCode, customerCode, ...paginationProps}: ContentProps
): ReactElement {
    return (
        <PageFlexWrapper>
            <CustomerReviewLogsPageHeader
                customerCode={customerCode}
                reviewCode={reviewCode}
            />

            {logs.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {logs.map((log) => (
                        <CustomerReviewLogCard key={log._id} log={log}/>
                    ))}
                </div>
            ) : (
                <EmptyArrayContainer
                    className="flex-1"
                    text="There Are No Logs"
                />
            )}

            <PaginationRangeButtons {...paginationProps} />
        </PageFlexWrapper>
    );
}