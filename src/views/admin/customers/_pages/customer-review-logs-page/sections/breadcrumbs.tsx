/**
 * @fileoverview Breadcrumb navigation component for the Customer Review Logs page.
 */

import { ReactElement } from "react"
import {UserUniqueCode} from "@/domains/users/_schema/fields/UserUniqueCodeSchema.ts"
import {MovieReviewUniqueCode} from "@/domains/movie-reviews/_schema/fields"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx"
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx"

/** Props for the CustomerReviewLogsPageBreadcrumbs component. */
type BreadcrumbsProps = {
    customerCode: UserUniqueCode
    reviewCode: MovieReviewUniqueCode
}

/** Breadcrumb trail for navigating from a customer profile to specific review logs. */
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