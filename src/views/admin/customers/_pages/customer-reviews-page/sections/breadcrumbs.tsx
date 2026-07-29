/**
 * @fileoverview Breadcrumb navigation for the Customer Reviews page.
 *
 */

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/views/common/_comp/ui/breadcrumb.tsx";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {ReactElement} from "react";
import {ObjectId} from "@/common/_schemas";
import {UserUniqueCode} from "@/domains/users";

/** Props for the CustomerReviewsPageBreadcrumbs component. */
type NavProps = {
    customerID: ObjectId;
    customerName: string;
    customerCode: UserUniqueCode;
};

/**
 * Renders a breadcrumb navigation bar for navigating back to the customer profile.
 */
export function CustomerReviewsPageBreadcrumbs(
    {customerID, customerName, customerCode}: NavProps
): ReactElement {
    return (
        <nav aria-label="Breadcrumbs">
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
                        <BreadcrumbPage>
                            Reviews
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </nav>
    );
}