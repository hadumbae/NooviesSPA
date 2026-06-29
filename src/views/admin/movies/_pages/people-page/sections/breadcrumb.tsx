/**
 * @fileoverview Breadcrumb navigation for the movie personnel administration page.
 */

import {ReactElement} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import {RoleTypeDepartment} from "@/domains/roletypes/_schema/fields/RoleTypeDepartmentSchema.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {Movie} from "@/domains/movies/_schema/movie/MovieSchema.ts";

/** Props for the MoviePersonListBreadcrumb component. */
type PersonListBreadcrumbProps = {
    movie: Movie;
    department: RoleTypeDepartment;
};

/**
 * Renders a breadcrumb trail for navigating between movie lists, movie details, and specific department personnel.
 */
export function MoviePersonListBreadcrumb(
    {movie, department}: PersonListBreadcrumbProps
): ReactElement {
    const {slug, title, releaseDate} = movie;

    const parsedDepartment = convertToTitleCase(department);
    const parsedReleaseYear = releaseDate ? `(${releaseDate.toFormat("yyyy")})` : "";

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink to="/admin/movies">
                            All Movies
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink to={`/admin/movies/get/${slug}`}>
                            {`${title} ${parsedReleaseYear}`}
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>{parsedDepartment}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}