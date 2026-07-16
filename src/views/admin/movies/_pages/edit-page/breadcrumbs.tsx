/**
 * @fileoverview Breadcrumb navigation component for the movie editing administrative view.
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
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";

/** Props for the MovieEditBreadcrumbs component. */
type BreadcrumbProps = {
    movieSlug: SlugString;
    movieTitle: string;
};

/**
 * Renders the breadcrumb trail for the administrative movie editing interface.
 */
export function MovieEditBreadcrumbs({movieSlug, movieTitle}: BreadcrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink
                            to="/admin/movies"
                            component={MovieEditBreadcrumbs.name}
                        >
                            All Movies
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink
                            to={`/admin/movies/get/${movieSlug}`}
                            component={MovieEditBreadcrumbs.name}
                        >
                            {movieTitle}
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>Edit Movie</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}