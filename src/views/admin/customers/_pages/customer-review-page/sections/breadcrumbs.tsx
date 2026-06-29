/**
 * @fileoverview Navigation breadcrumbs for the administrative Customer Review detail page.
 */

import {ReactElement} from "react";
import {UserUniqueCode} from "@/domains/users";
import {MovieReviewUniqueCode} from "@/domains/movie-reviews";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/common/components/ui";

/** Props for the CustomerReviewPageBreadcrumbs component. */
type BreadcrumbProps = {
    customerCode: UserUniqueCode;
    reviewCode: MovieReviewUniqueCode;
};

/** Provides hierarchical navigation trails for administrative review moderation. */
export function CustomerReviewPageBreadcrumbs(
    {customerCode, reviewCode}: BreadcrumbProps
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

                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers/${customerCode}/reviews`}
                        >
                            Reviews
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Review {reviewCode}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </nav>
    );
}