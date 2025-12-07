/**
 * @file TheatresPage.tsx
 * Top-level admin page for browsing and managing theatres.
 * Handles filtering, sorting, pagination, and validated theatre queries.
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
 * **Component: TheatreIndexPage**
 * Entry point for the Theatre Index admin view.
 *
 * **Behaviour**
 * - Sets page title ("Theatre Index")
 * - Uses {@link usePaginationSearchParams} for pagination
 * - Parses filter/sort params via {@link useParsedSearchParams}
 * - Fetches paginated theatres using {@link useFetchTheatres}
 *
 * **Query Safety**
 * - Wraps content in {@link QueryBoundary} and
 *   {@link ValidatedQueryBoundary} to enforce correct API response shape.
 *
 * **Render Flow**
 * - Validated API result → `{ items, totalItems }`
 * - Delegates full UI rendering to {@link TheatreIndexPageContent}
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

    // ⚡ Pagination ⚡
    const { page, perPage } = usePaginationSearchParams();

    // ⚡ Filter + Sort Params ⚡
    const { searchParams } = useParsedSearchParams({
        schema: TheatreQueryOptionSchema,
    });

    // ⚡ Query: Fetch theatres ⚡
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
                {({ items, totalItems }: PaginatedTheatreDetails) => (
                    <TheatreIndexPageContent
                        theatres={items}
                        totalItems={totalItems}
                    />
                )}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreIndexPage;
