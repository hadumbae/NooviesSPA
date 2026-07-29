/**
 * @fileoverview Layout and presentation logic for the Customer Review Logs page.
 */

import {ReactElement} from "react";
import {User} from "@/domains/users";
import {MovieReviewModerationLog, PopulatedMovieReview} from "@/domains/movie-reviews";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {PageHeader, PaginationRangeButtons} from "@/views/common/_comp";
import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";
import {CustomerReviewLogCard} from "@/views/admin/customers/_comp";
import {CustomerReviewLogsPageBreadcrumbs} from "@/views/admin/customers/_pages/customer-review-logs-page/sections";

/** Props for the CustomerReviewLogsPageContent component. */
type ContentProps = {
    logs: MovieReviewModerationLog[];
    customer: User;
    review: PopulatedMovieReview;
    pagination: {
        page: number;
        perPage: number;
        totalItems: number;
        setPage: (page: number) => void;
    }
};

/**
 * Primary content area for review logs that displays a grid of log cards and pagination.
 */
export function CustomerReviewLogsPageContent(
    {logs, customer, review, pagination}: ContentProps
): ReactElement {
    const {_id: customerID, name: customerName, uniqueCode: customerCode} = customer;
    const {_id: reviewID, uniqueCode: reviewCode} = review;

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Customer Review Logs"
                subtitle={reviewCode}
                breadcrumbs={
                    <CustomerReviewLogsPageBreadcrumbs
                        customerID={customerID}
                        customerName={customerName}
                        customerCode={customerCode}
                        reviewCode={reviewCode}
                        reviewID={reviewID}
                    />}
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

            <PaginationRangeButtons {...pagination} />
        </PageFlexWrapper>
    );
}