/**
 * @fileoverview Breadcrumb navigation for the Customer Reviews page.
 *
 */

import {UserUniqueCode} from "@/domains/users/_schema/fields/UserUniqueCodeSchema.ts";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {ReactElement} from "react";

/** Props for the CustomerReviewsPageBreadcrumbs component. */
type NavProps = {
    customerCode: UserUniqueCode;
};

/**
 * Renders a breadcrumb navigation bar for navigating back to the customer profile.
 */
export function CustomerReviewsPageBreadcrumbs(
    {customerCode}: NavProps
): ReactElement {
    return (
        <nav aria-label="Breadcrumbs">
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
                        <BreadcrumbPage>
                            Reviews
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </nav>
    );
}