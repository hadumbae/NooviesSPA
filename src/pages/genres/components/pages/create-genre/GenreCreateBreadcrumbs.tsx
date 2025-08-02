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
 * Breadcrumb navigation for the "Create Genre" page.
 *
 * Displays a two-level breadcrumb:
 * - **Index** (link to the genres index page)
 * - **Create Genre** (current page)
 *
 * Intended to provide clear navigation context for users when creating a new genre.
 *
 * @example
 * ```tsx
 * <GenreCreateBreadcrumbs />
 * ```
 */
const GenreCreateBreadcrumbs: FC = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin/genres">
                            Index
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>Create Genre</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default GenreCreateBreadcrumbs;
