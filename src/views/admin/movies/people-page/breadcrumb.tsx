/**
 * @fileoverview Defines the breadcrumb navigation for a movie's personnel listing.
 * Provides a hierarchical path from the movie library to the specific movie profile,
 * ending at the filtered department view (Cast or Crew).
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
import {RoleTypeDepartment} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";

type PersonListBreadcrumbProps = {
    movie: Movie;
    department: RoleTypeDepartment;
};

/**
 * Renders a breadcrumb trail for administrative movie personnel lists.
 */
export function MoviePersonListBreadcrumb(
    {movie, department}: PersonListBreadcrumbProps
): ReactElement {
    const {_id, title, releaseDate} = movie;

    const parsedDepartment = convertToTitleCase(department);
    const parsedReleaseYear = releaseDate ? `(${releaseDate.toFormat("yyyy")})` : "";

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink
                            to="/admin/movies"
                            component={MoviePersonListBreadcrumb.name}
                        >
                            All Movies
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink
                            to={`/admin/movies/get/${_id}`}
                            component={MoviePersonListBreadcrumb.name}
                        >
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