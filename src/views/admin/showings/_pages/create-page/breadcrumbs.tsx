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
} from "@/views/common/_comp/ui";
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";

/**
 * Renders the breadcrumb trail linking back to the showings index from the creation view.
 */
export function ShowingCreateBreadcrumbs(): ReactElement {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbLink asChild>
                    <HoverLink to="/admin/showings" component={ShowingCreateBreadcrumbs.name}>
                        All Showings
                    </HoverLink>
                </BreadcrumbLink>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>Create Showings</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
