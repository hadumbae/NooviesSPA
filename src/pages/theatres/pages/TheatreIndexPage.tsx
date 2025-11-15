/**
 * @file TheatresPage.tsx
 * @description Client/admin index page for managing and browsing theatres.
 * Integrates filtering, sorting, pagination, and validated theatre queries.
 */

import {FC} from 'react';
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import useTitle from "@/common/hooks/document/useTitle.ts";
import useFetchTheatres from "@/pages/theatres/hooks/query/useFetchTheatres.ts";
import {PaginatedTheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {PaginatedTheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {TheatreQueryOptionSchema} from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";
import TheatreIndexPageContent from "@/pages/theatres/pages/theatre-index-page/TheatreIndexPageContent.tsx";

/**
 * Top–level page component for the Theatre Index.
 *
 * This component provides:
 *
 * **Page Setup**
 * - Sets the document title to `"Theatre Index"`.
 *
 * **Search Parameter Handling**
 * - Reads pagination values (`page`, `perPage`) from URL search params.
 * - Parses and validates theatre query parameters (filters/sorting)
 *   via {@link TheatreQueryOptionSchema}.
 *
 * **Data Fetching**
 * - Fetches paginated theatre results using {@link useFetchTheatres},
 *   including population and virtual fields.
 *
 * **Query Safety**
 * - Wraps rendering in:
 *   - {@link QueryBoundary} for general loading/error handling.
 *   - {@link ValidatedQueryBoundary} to ensure API data
 *     conforms to {@link PaginatedTheatreDetailsSchema}.
 *
 * **Rendering**
 * - Passes validated theatre items and total count to
 *   {@link TheatreIndexPageContent}, which renders:
 *   - Theatre cards
 *   - Empty-state fallback
 *   - Page-level filters and actions
 *
 * @component
 *
 * @example
 * ```tsx
 * // Renders the complete admin theatre index page
 * <TheatreIndexPage />
 * ```
 */
const TheatreIndexPage: FC = () => {
    useTitle("Theatre Index");

    // Pagination
    const {page, perPage} = usePaginationSearchParams();

    // Filter/sort query params
    const {searchParams} = useParsedSearchParams({schema: TheatreQueryOptionSchema});

    // Theatre query
    const query = useFetchTheatres({
        virtuals: true,
        populate: true,
        paginated: true,
        page,
        perPage,
        ...searchParams,
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedTheatreDetailsSchema}>
                {({items, totalItems}: PaginatedTheatreDetails) => (
                    <TheatreIndexPageContent theatres={items} totalItems={totalItems} />
                )}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreIndexPage;
