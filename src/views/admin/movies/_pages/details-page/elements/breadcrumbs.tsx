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
} from "@/views/common/_comp/ui";
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";

/**
 * Renders the breadcrumb trail for navigating back to the movie management index.
 */
export function MovieDetailsBreadcrumb() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <HoverLink
                            to="/admin/movies"
                            component={MovieDetailsBreadcrumb.name}
                        >
                            All Movies
                        </HoverLink>
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