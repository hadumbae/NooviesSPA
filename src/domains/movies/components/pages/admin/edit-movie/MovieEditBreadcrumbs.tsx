import { FC } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Props for {@link MovieEditBreadcrumbs}.
 */
type BreadcrumbProps = {
    /** The unique ID of the movie being edited. */
    movieID: ObjectId;
    /** The title of the movie being edited. Displayed in the breadcrumb. */
    movieTitle: string;
};

/**
 * Breadcrumb navigation component for the Movie Edit page.
 *
 * Displays a hierarchical breadcrumb trail for movie administration:
 * 1. "All Movies" – links to the movies index page.
 * 2. Movie title – links to the movie detail page.
 * 3. "Edit Movie" – the current page (non-clickable).
 *
 * Integrates with {@link LoggedHoverLink} to log navigation actions for analytics or debugging.
 *
 * @example
 * ```tsx
 * <MovieEditBreadcrumbs movieID="64b8f1a2c9e123456789abcd" movieTitle="Inception" />
 * ```
 */
const MovieEditBreadcrumbs: FC<BreadcrumbProps> = ({ movieID, movieTitle }) => {
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

                <BreadcrumbSeparator />

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

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>Edit Movie</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default MovieEditBreadcrumbs;
