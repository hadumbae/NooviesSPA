/**
 * @fileoverview Navigation breadcrumbs for the administrative Customer Review detail page.
 */

import {ReactElement} from "react";
import {UserUniqueCode} from "@/domains/users";
import {MovieReviewUniqueCode} from "@/domains/movie-reviews";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/views/common/_comp/ui";
import {ObjectId} from "@/common/_schemas";

/** Props for the CustomerReviewPageBreadcrumbs component. */
type BreadcrumbProps = {
    customerID: ObjectId;
    customerName: string;
    customerCode: UserUniqueCode;
    reviewCode: MovieReviewUniqueCode;
};

/** Provides hierarchical navigation trails for administrative review moderation. */
export function CustomerReviewPageBreadcrumbs(
    {customerID, customerName, customerCode, reviewCode}: BreadcrumbProps
): ReactElement {
    return (
        <nav aria-label="Breadcrumb">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers`}
                        >
                            Customers
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers/${customerID}`}
                        >
                            {customerName} • {customerCode}
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers/${customerID}/reviews`}
                        >
                            Reviews
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {reviewCode}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </nav>
    );
}