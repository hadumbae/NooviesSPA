import {FC} from 'react';
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import useTitle from "@/common/hooks/document/useTitle.ts";
import {PaginatedGenreDetailsSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {PaginatedGenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {GenreQueryOptionSchema} from "@/pages/genres/schema/filters/GenreQueryOptions.schema.ts";
import GenreIndexPageContent from "@/pages/genres/pages/genre-index-page/GenreIndexPageContent.tsx";
import useFetchPaginatedGenres from "@/pages/genres/hooks/fetch-data/useFetchPaginatedGenres.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/**
 * **GenreIndexPage**
 *
 * Top-level page component for browsing and managing genres.
 *
 * Acts as the orchestration layer that wires together:
 * - document metadata
 * - pagination state
 * - URL-based filters
 * - server data fetching
 * - schema validation
 *
 * ## Responsibilities
 * - Sets the document title via {@link useTitle}
 * - Restores pagination from router location state
 * - Synchronizes pagination with URL search params
 * - Parses and validates filter search params
 * - Fetches paginated genre data
 * - Guards rendering with query + schema boundaries
 *
 * ## Data Flow
 * `location.state → URL search params → query → validated render`
 *
 * ## Pagination
 * - Pagination state is URL-driven for shareability
 * - `location.state` is used only as an initial fallback
 *
 * @component
 */
const GenreIndexPage: FC = () => {
    // --- Page Setup ---

    useTitle("Genres");

    // --- Pagination & Query Params ---

    const {data: paginationState} = usePaginationLocationState();
    const {page, perPage, setPage} = usePaginationSearchParams(
        paginationState ?? {page: 1, perPage: 25}
    );

    const {searchParams} = useParsedSearchParams({
        schema: GenreQueryOptionSchema
    });

    // --- Data Fetching ---

    const query = useFetchPaginatedGenres({
        page,
        perPage,
        queries: searchParams,
        config: {virtuals: true, populate: true},
    });

    // --- RENDER ---

    return (
        <ValidatedDataLoader query={query} schema={PaginatedGenreDetailsSchema}>
            {({totalItems, items}: PaginatedGenreDetails) => (
                <GenreIndexPageContent
                    genres={items}
                    totalItems={totalItems}
                    page={page}
                    perPage={perPage}
                    setPage={setPage}
                />
            )}
        </ValidatedDataLoader>
    );
};

export default GenreIndexPage;
