/**
 * @fileoverview Defines the breadcrumb navigation for the Customer Reviews page.
 */

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {ReactElement} from "react";

type NavProps = {
    customerCode: UserUniqueCode;
};

/**
 * Renders a breadcrumb navigation bar allowing users to navigate back to the
 * customer profile from the reviews view.
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