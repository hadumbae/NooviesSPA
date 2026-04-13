/**
 * @fileoverview Defines the breadcrumb navigation for the Movie Edit page.
 * Provides a hierarchical path from the movie index to the specific movie
 * profile, ending at the current edit view.
 */

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

type BreadcrumbProps = {
    movieID: ObjectId;
    movieTitle: string;
};

/**
 * Renders the breadcrumb trail for the administrative movie editing interface.
 */
export function MovieEditBreadcrumbs({movieID, movieTitle}: BreadcrumbProps) {
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
                            to={`/admin/movies/get/${movieID}`}
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