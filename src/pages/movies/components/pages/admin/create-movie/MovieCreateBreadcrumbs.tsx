import {FC} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";

/**
 * `MovieCreateBreadcrumbs` is a breadcrumb navigation component
 * for the "Create Movies" page.
 *
 * It provides a navigation trail that lets users:
 * - Navigate back to the "All Movies" page.
 * - See the current location ("Create Movies").
 *
 * @example
 * ```tsx
 * <MovieCreateBreadcrumbs />
 * ```
 */
const MovieCreateBreadcrumbs: FC = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin/movies">All Movies</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>Create Movies</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default MovieCreateBreadcrumbs;
