/**
 * @file ShowingCreateBreadcrumbs.tsx
 * @description
 * Renders breadcrumb navigation for the "Create Showings" page in the admin panel.
 *
 * This breadcrumb provides context for users by showing:
 * 1. A link back to "All Showings"
 * 2. The current page "Create Showings"
 *
 * Uses `LoggedLink` for the navigation link and the reusable `Breadcrumb` UI components.
 *
 * @example
 * ```tsx
 * <ShowingCreateBreadcrumbs />
 * ```
 */

import { FC } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import LoggedLink from "@/common/components/navigation/LoggedLink.tsx";

/**
 * `ShowingCreateBreadcrumbs` displays the breadcrumb trail for the
 * "Create Showings" admin page.
 *
 * - First item links back to the "All Showings" page.
 * - Second item displays the current page as "Create Showings".
 *
 * @example
 * ```tsx
 * <ShowingCreateBreadcrumbs />
 * ```
 */
const ShowingCreateBreadcrumbs: FC = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbLink asChild>
                    <LoggedLink to="/admin/showings" component={ShowingCreateBreadcrumbs.name}>
                        All Showings
                    </LoggedLink>
                </BreadcrumbLink>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>Create Showings</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default ShowingCreateBreadcrumbs;
