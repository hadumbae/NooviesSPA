import {FC} from "react";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {PaginatedShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import {PaginatedShowingDetailsSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import ShowingIndexPageContent from "@/pages/showings/pages/index-page/ShowingIndexPageContent.tsx";
import useFetchPaginatedShowings from "@/pages/showings/hooks/queries/useFetchPaginatedShowings.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {ShowingQueryOptionSchema} from "@/pages/showings/schema/queries/ShowingQueryOption.schema.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/**
 * **ShowingIndexPage**
 *
 * Admin index page for **Showings**, displaying a paginated list of movie showings.
 *
 * @description
 * This page component:
 * - Fetches paginated showing data via {@link useFetchPaginatedShowings}.
 * - Validates the fetched data against {@link PaginatedShowingDetailsSchema}.
 * - Displays a header with the page title and a "Create" button via {@link ShowingIndexHeader}.
 * - Renders a responsive grid of {@link ShowingIndexListDialog} components for each showing.
 * - Shows a placeholder message when no showings are available.
 *
 * Uses {@link QueryBoundary} and {@link ValidatedQueryBoundary} for error handling and schema validation.
 *
 * @component
 * @returns {JSX.Element} The admin showings index page.
 *
 * @example
 * ```tsx
 * import ShowingIndexPage from "@/pages/showings/components/admin/index-page/ShowingIndexPage.tsx";
 *
 * const AdminPage = () => <ShowingIndexPage />;
 * ```
 */
const ShowingIndexPage: FC = () => {
    // --- Pagination ---
    const {page, perPage} = usePaginationSearchParams({page: 1, perPage: 25});

    const {searchParams} = useParsedSearchParams({schema: ShowingQueryOptionSchema});

    // --- Query ---
    const query = useFetchPaginatedShowings({
        page,
        perPage,
        queryConfig: {populate: true, virtuals: true},
        queries: filterNullishAttributes(searchParams),
    });

    // --- Render ---
    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedShowingDetailsSchema}>
                {({items: showings, totalItems}: PaginatedShowingDetails) => (
                    <ShowingIndexPageContent showings={showings} totalItems={totalItems}/>
                )}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default ShowingIndexPage;
