/**
 * @fileoverview Breadcrumb navigation component for the user details administrative page.
 */

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/views/common/_comp/ui";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {ReactElement} from "react";
import {UserUniqueCode} from "@/domains/users";

/** Props for the UserDetailsPageBreadcrumbs component. */
type NavProps = {
    userName: string;
    uniqueCode: UserUniqueCode;
};

/**
 * Renders a navigation breadcrumb trail for a specific user's detail view.
 */
export function UserDetailsPageBreadcrumbs(
    {userName, uniqueCode}: NavProps
): ReactElement {
    return (
        <nav aria-label="Breadcrumbs">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/users`}
                        >
                            Users Index
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            User • {userName} • {uniqueCode}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </nav>
    );
}