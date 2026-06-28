/**
 * @fileoverview Breadcrumb navigation for the showing creation page in the admin panel.
 */

import {ReactElement} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";

/**
 * Renders the breadcrumb trail linking back to the showings index from the creation view.
 */
export function ShowingCreateBreadcrumbs(): ReactElement {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbLink asChild>
                    <LoggedHoverLink to="/admin/showings" component={ShowingCreateBreadcrumbs.name}>
                        All Showings
                    </LoggedHoverLink>
                </BreadcrumbLink>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>Create Showings</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
