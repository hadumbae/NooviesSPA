/**
 * @fileoverview Breadcrumb navigation for the movie creation administrative page.
 */

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";

/** Breadcrumb component providing navigation back to the movie list from the creation view. */
export function MovieCreatePageBreadcrumbs() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <HoverLink
                            to="/admin/movies"
                            component={MovieCreatePageBreadcrumbs.name}
                        >
                            All Movies
                        </HoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>Create Movies</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}