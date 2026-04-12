/**
 * @fileoverview Defines the layout and presentation logic for the Customer
 * Review Logs page, including the grid of log cards and pagination controls.
 */

import {ReactElement} from "react";
import {MovieReviewModerationLog} from "@/domains/review/features/moderation/schema";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {MovieReviewUniqueCode} from "@/domains/review/features/codes";
import {CustomerReviewLogsPageHeader} from "@/views/admin/customers/customer-review-logs-page/header.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {CustomerReviewLogCard} from "@/views/admin/customers/_comp/CustomerReviewLogCard.tsx";

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
 * Renders the primary content area for review logs, handling the empty state
 * and the responsive grid layout for log cards.
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
                        <CustomerReviewLogCard key={log._id} log={log} />
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