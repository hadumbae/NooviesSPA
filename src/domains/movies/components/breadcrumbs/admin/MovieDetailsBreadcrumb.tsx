import {FC} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";

/**
 * Breadcrumb navigation for the Movie Details page.
 *
 * Provides hierarchical links for:
 * 1. All Movies (links back to the main movies list)
 * 2. Current page ("Movie Details")
 *
 * @example
 * ```tsx
 * <MovieDetailsBreadcrumb />
 * ```
 *
 * @returns A React functional component rendering the movie details breadcrumb.
 */
const MovieDetailsBreadcrumb: FC = () => {
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
};

export default MovieDetailsBreadcrumb;
