/**
 * @fileoverview Defines the breadcrumb navigation component for the Customer
 * Review Logs page, facilitating hierarchical navigation from the profile
 * down to specific review audit trails.
 */

import {ReactElement} from "react"
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts"
import {MovieReviewUniqueCode} from "@/domains/review/features/codes"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx"
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx"

/** Props for the CustomerReviewLogsPageBreadcrumbs component. */
type BreadcrumbsProps = {
    customerCode: UserUniqueCode
    reviewCode: MovieReviewUniqueCode
}

/**
 * Renders a breadcrumb trail allowing administrators to navigate back to the
 * customer profile, the review index, or the specific review context.
 */
export function CustomerReviewLogsPageBreadcrumbs(
    {customerCode, reviewCode}: BreadcrumbsProps
): ReactElement {
    return (
        <nav aria-label="Breadcrumb">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers/${customerCode}/profile`}
                        >
                            Customer Profile
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers/${customerCode}/reviews`}
                        >
                            Reviews
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers/${customerCode}/reviews/${reviewCode}`}
                        >
                            Review {reviewCode}
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Logs
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </nav>
    )
}