import {ReactElement} from "react";
import {MovieReviewModerationLog} from "@/domains/review/features/moderation/schema";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {MovieReviewUniqueCode} from "@/domains/review/features/codes";
import {CustomerReviewLogsPageHeader} from "@/views/admin/customers/customer-review-logs-page/header.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

type ContentProps = {
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    logs: MovieReviewModerationLog[];
    totalItems: number;
    customerCode: UserUniqueCode;
    reviewCode: MovieReviewUniqueCode;
};

export function CustomerReviewLogsPageContent(
    {logs, reviewCode, customerCode, ...paginationProps}: ContentProps
): ReactElement {
    return (
        <PageFlexWrapper>
            <CustomerReviewLogsPageHeader
                customerCode={customerCode}
                reviewCode={reviewCode}
            />

            {
                logs.length > 0
                    ? (
                        <ol>
                            {logs.map((log) => <li key={log._id}>{log.message}</li>)}
                        </ol>
                    ) : (
                        <EmptyArrayContainer
                            className="flex-1"
                            text="There Are No Logs"
                        />
                    )
            }

            <PaginationRangeButtons
                {...paginationProps}
            />
        </PageFlexWrapper>
    );
}