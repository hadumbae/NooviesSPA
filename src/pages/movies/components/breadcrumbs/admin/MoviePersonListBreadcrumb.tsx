import {FC} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import convertToTitleCase from "@/common/utility/convertToTitleCase.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import LoggedLink from "@/common/components/navigation/LoggedLink.tsx";

/**
 * Props for the {@link MoviePersonListBreadcrumb} component.
 */
type PersonListBreadcrumbProps = {
    /** The movie for which the breadcrumb is being displayed */
    movie: Movie;

    /** The department (CAST or CREW) to display in the breadcrumb */
    department: RoleTypeDepartment;
}

/**
 * Displays a breadcrumb navigation for a movie's person list.
 *
 * Provides hierarchical links for:
 * 1. All Movies
 * 2. Specific movie details (with release year if available)
 * 3. The selected department (CAST or CREW)
 *
 * @example
 * ```tsx
 * <MoviePersonListBreadcrumb
 *   movie={{_id: "123", title: "Inception", releaseDate: new Date("2010-07-16")}}
 *   department="CAST"
 * />
 * ```
 *
 * @param props - {@link PersonListBreadcrumbProps} containing movie and department info.
 *
 * @returns A React functional component rendering a breadcrumb navigation.
 */
const MoviePersonListBreadcrumb: FC<PersonListBreadcrumbProps> = ({movie, department}) => {
    const {_id, title, releaseDate} = movie;

    const parsedDepartment = convertToTitleCase(department);
    const parsedReleaseDate = releaseDate ? `(${releaseDate.toFormat("yyyy")})` : "";

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedLink
                            to="/admin/movies"
                            component={MoviePersonListBreadcrumb.name}
                        >
                            All Movies
                        </LoggedLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedLink
                            to={`/admin/movies/get/${_id}`}
                            component={MoviePersonListBreadcrumb.name}
                        >
                            {`${title} ${parsedReleaseDate}`}
                        </LoggedLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>{parsedDepartment}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default MoviePersonListBreadcrumb;
