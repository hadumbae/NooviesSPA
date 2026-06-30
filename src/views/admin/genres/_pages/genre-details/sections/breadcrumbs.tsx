/**
 * @fileoverview Breadcrumb navigation for the Genre details view.
 * Persists pagination and filter state when navigating back to the index.
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
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import convertToQueryParams from "@/common/utility/query/convertToQueryParams.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/** Props for the {@link GenreDetailsPageBreadcrumbs} component. */
type BreadcrumbProps = {
    /** The display name of the genre being viewed. */
    genreName: string;
};

/**
 * Renders breadcrumbs for the Genre details page.
 */
export function GenreDetailsPageBreadcrumbs(
    {genreName}: BreadcrumbProps
): ReactElement {
    const {data: state} = usePaginationLocationState();
    const query = convertToQueryParams(state);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedLink
                            to={`/admin/genres?${query.toString()}`}
                            component={GenreDetailsPageBreadcrumbs.name}
                        >
                            All Genres
                        </LoggedLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>{genreName} | Details</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}