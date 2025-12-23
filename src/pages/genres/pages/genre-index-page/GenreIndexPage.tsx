import {FC} from 'react';
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import useTitle from "@/common/hooks/document/useTitle.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {PaginatedGenreDetailsSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {PaginatedGenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {GenreQueryOptionSchema} from "@/pages/genres/schema/filters/GenreQueryOptions.schema.ts";
import GenreIndexPageContent from "@/pages/genres/pages/genre-index-page/GenreIndexPageContent.tsx";
import useFetchPaginatedGenres from "@/pages/genres/hooks/fetch-data/useFetchPaginatedGenres.ts";

/**
 * Full index page for managing and browsing movie genres.
 *
 * This page component composes filtering, pagination, data validation, and
 * responsive rendering into a single unified experience. It acts as the
 * top-level orchestration layer for genre listing behavior.
 *
 * ## Responsibilities
 * - Sets the browser document title via {@link useTitle}.
 * - Restores pagination state from `location.state` using {@link usePaginationLocationState}.
 * - Synchronizes pagination with the URL using {@link usePaginationSearchParams}.
 * - Parses and validates genre filter options from search parameters using
 *   {@link useParsedSearchParams} with {@link GenreQueryOptionSchema}.
 * - Fetches paginated genre data from the server using {@link useFetchPaginatedGenres}.
 * - Ensures server responses conform to {@link PaginatedGenreDetailsSchema}
 *   through {@link ValidatedQueryBoundary}.
 * - Provides loading, error, and success UI states via {@link QueryBoundary}.
 *
 * ## Rendering Flow
 * 1. **QueryBoundary**
 *    Displays loading and error states for network activity.
 *
 * 2. **ValidatedQueryBoundary**
 *    Ensures the API response matches the expected structure before rendering.
 *
 * 3. **GenreIndexPageContent**
 *    Displays:
 *    - Page header
 *    - Filter panel
 *    - Genre cards (or empty state)
 *    - Pagination controls
 *
 * ## Pagination Behavior
 * - If the user navigates back to this page, previously selected page/perPage
 *   values may be restored from the router `location.state`.
 * - Pagination state is synced with the URL for shareability and refresh stability.
 *
 * ## Example
 * ```tsx
 * import GenreIndexPage from "@/pages/genres/pages/genre-index-page/GenreIndexPage";
 *
 * export default function AdminGenresRoute() {
 *   return <GenreIndexPage />;
 * }
 * ```
 *
 * @component
 */
const GenreIndexPage: FC = () => {
    // --- Page Setup ---

    useTitle("Genres");

    // --- Pagination & Query Params ---

    const {data: paginationState} = usePaginationLocationState();
    const {page, perPage} = usePaginationSearchParams(paginationState ?? {page: 1, perPage: 25});
    const {searchParams} = useParsedSearchParams({schema: GenreQueryOptionSchema});

    // --- Data Fetching ---

    const query = useFetchPaginatedGenres({
        page,
        perPage,
        queries: searchParams,
        requestOptions: {virtuals: true, populate: true},
    });

    // --- RENDER ---

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedGenreDetailsSchema}>
                {({totalItems, items}: PaginatedGenreDetails) => (
                    <GenreIndexPageContent genres={items} totalItems={totalItems}/>
                )}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default GenreIndexPage;
