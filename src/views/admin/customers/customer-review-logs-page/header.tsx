/**
 * @fileoverview Defines the header component for the Customer Review Logs page.
 * Includes breadcrumb navigation and descriptive titles to provide context
 * for the specific review being audited.
 */

import {ReactElement} from "react"
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts"
import {MovieReviewUniqueCode} from "@/domains/review/features/codes"
import {CustomerReviewLogsPageBreadcrumbs} from "@/views/admin/customers/customer-review-logs-page/breadcrumbs.tsx"

/** Props for the CustomerReviewLogsPageHeader component. */
type HeaderProps = {
    customerCode: UserUniqueCode
    reviewCode: MovieReviewUniqueCode
}

/**
 * Renders the page header containing hierarchical navigation and the
 * primary page titles.
 */
export function CustomerReviewLogsPageHeader(
    {customerCode, reviewCode}: HeaderProps
): ReactElement {
    return (
        <header className="space-y-2">
            <CustomerReviewLogsPageBreadcrumbs
                customerCode={customerCode}
                reviewCode={reviewCode}
            />

            <div>
                <h1 className="page-title text-2xl font-bold tracking-tight">
                    Customer Review Logs
                </h1>
                <h2 className="page-subtitle font-light text-muted-foreground">
                    Review {reviewCode}
                </h2>
            </div>
        </header>
    )
}