/**
 * @file TheatreIndexPage.tsx
 *
 * Top-level admin page for browsing and managing theatres.
 *
 * Responsibilities:
 * - Parse pagination and filter state from URL search params
 * - Fetch paginated theatre data from the API
 * - Runtime-validate API responses
 * - Delegate all UI rendering to the index page content component
 */

import {ReactElement} from "react";
import useTitle from "@/common/hooks/document/useTitle.ts";
import {PaginatedTheatreDetailsSchema} from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";
import {PaginatedTheatreDetails} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {TheatreQueryOptionSchema} from "@/domains/theatres/schema/queries/TheatreQueryOption.schema.ts";
import {TheatreIndexPageContent} from "@/views/admin/theatres/index-page/content.tsx";
import useParsedPaginationValue from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import QueryErrorBoundary from "@/common/components/boundary/query-error-fallback/QueryErrorBoundary.tsx";
import {TheatreHttpStatusOverrideText} from "@/domains/theatres/constants/TheatreHttpStatusOverrideText.ts";
import {useFetchPaginatedTheatres} from "@/domains/theatres/_feat/crud-hooks";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";

/**
 * Number of theatres displayed per page.
 *
 * Shared between pagination state and the paginated API query
 * to ensure UI and backend remain consistent.
 */
const THEATRES_PER_PAGE = 20;

/**
 * **TheatreIndexPage**
 *
 * Admin entry point for the Theatre Index view.
 *
 * Flow:
 * 1. Set document title
 * 2. Parse pagination (`page`) from URL
 * 3. Parse filter/sort options via {@link TheatreQueryOptionSchema}
 * 4. Fetch paginated theatre data
 * 5. Validate API response at runtime
 * 6. Delegate rendering to {@link TheatreIndexPageContent}
 *
 * Validation:
 * - {@link ValidatedDataLoader} enforces {@link PaginatedTheatreDetailsSchema}
 *
 * @component
 *
 * @example
 * ```tsx
 * <TheatreIndexPage />
 * ```
 */
export function TheatreIndexPage(): ReactElement {
    useTitle("Theatre Index");

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams} = useParsedSearchParams({schema: TheatreQueryOptionSchema});

    const query = useFetchPaginatedTheatres({
        schema: PaginatedTheatreDetailsSchema,
        page,
        perPage: THEATRES_PER_PAGE,
        queries: searchParams,
        config: {virtuals: true, populate: true},
    });

    return (
        <QueryErrorBoundary statusTextOverride={TheatreHttpStatusOverrideText}>
            <QueryDataLoader query={query}>
                {({items, totalItems}: PaginatedTheatreDetails) => (
                    <TheatreIndexPageContent
                        theatres={items}
                        page={page}
                        perPage={THEATRES_PER_PAGE}
                        setPage={setPage}
                        totalItems={totalItems}
                    />
                )}
            </QueryDataLoader>
        </QueryErrorBoundary>
    );
}
