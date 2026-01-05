/**
 * @file TheatreIndexPage.tsx
 *
 * Top-level admin page for browsing and managing theatres.
 * Coordinates filter parsing, pagination state, data fetching,
 * and validated rendering of the Theatre Index view.
 */

import {FC} from "react";
import useTitle from "@/common/hooks/document/useTitle.ts";
import {PaginatedTheatreDetailsSchema} from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {PaginatedTheatreDetails} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {TheatreQueryOptionSchema} from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";
import TheatreIndexPageContent from "@/pages/theatres/pages/theatre-index-page/TheatreIndexPageContent.tsx";
import useFetchPaginatedTheatres from "@/pages/theatres/hooks/fetch-theatre/useFetchPaginatedTheatres.ts";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";

/**
 * Number of theatres displayed per page in the Theatre Index view.
 *
 * Used by pagination state and passed to the paginated theatre query
 * to keep UI pagination and API results in sync.
 */
const THEATRES_PER_PAGE = 20;

/**
 * **Component: TheatreIndexPage**
 *
 * Entry point for the Theatre Index admin view.
 *
 * **Behaviour**
 * - Sets the document title to `"Theatre Index"`
 * - Parses pagination state from URL search params
 * - Parses filter and sort options using {@link TheatreQueryOptionSchema}
 * - Fetches paginated theatre data from the API
 *
 * **Query Safety**
 * - {@link QueryBoundary} handles loading and error states
 * - {@link ValidatedQueryBoundary} enforces API response shape at runtime
 *
 * **Render Flow**
 * - Fetch paginated data → validate response
 * - Destructure `{ items, totalItems }`
 * - Delegate all layout and interaction rendering to
 *   {@link TheatreIndexPageContent}
 *
 * **Example**
 * ```tsx
 * <TheatreIndexPage />
 * ```
 *
 * @component
 */
const TheatreIndexPage: FC = () => {
    useTitle("Theatre Index");

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams} = useParsedSearchParams({schema: TheatreQueryOptionSchema});

    const query = useFetchPaginatedTheatres({
        page,
        perPage: THEATRES_PER_PAGE,
        queries: searchParams,
        queryConfig: {virtuals: true, populate: true},
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedTheatreDetailsSchema}>
                {({items, totalItems}: PaginatedTheatreDetails) => (
                    <TheatreIndexPageContent
                        theatres={items}
                        page={page}
                        perPage={THEATRES_PER_PAGE}
                        setPage={setPage}
                        totalItems={totalItems}
                    />
                )}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreIndexPage;
