/**
 * @fileoverview Breadcrumb navigation for the showing creation page in the admin panel.
 */

import {ReactElement} from "react";
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/views/common/_comp/ui";

/**
 * Renders the breadcrumb trail linking back to the showings index from the creation view.
 */
export function ShowingCreateBreadcrumbs(): ReactElement {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbLink asChild>
                    <HoverLink to="/admin/showings">
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
