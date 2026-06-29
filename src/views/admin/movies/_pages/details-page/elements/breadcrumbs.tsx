/**
 * @fileoverview Breadcrumb navigation for the Movie Details administrative profile page.
 */


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
 * Renders the breadcrumb trail for navigating back to the movie management index.
 */
export function MovieDetailsBreadcrumb() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink
                            to="/admin/movies"
                            component={MovieDetailsBreadcrumb.name}
                        >
                            All Movies
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>Movie Details</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}