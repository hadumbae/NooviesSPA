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

import {FC} from "react";
import useTitle from "@/common/hooks/document/useTitle.ts";
import {PaginatedTheatreDetailsSchema} from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
import {PaginatedTheatreDetails} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {TheatreQueryOptionSchema} from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";
import TheatreIndexPageContent from "@/pages/theatres/pages/theatre-index-page/TheatreIndexPageContent.tsx";
import useFetchPaginatedTheatres from "@/pages/theatres/hooks/fetch-theatre/useFetchPaginatedTheatres.ts";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import QueryErrorBoundary from "@/common/components/boundary/query-error-fallback/QueryErrorBoundary.tsx";
import {TheatreHttpStatusOverrideText} from "@/pages/theatres/constants/TheatreHttpStatusOverrideText.ts";

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
const TheatreIndexPage: FC = () => {
    useTitle("Theatre Index");

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams} = useParsedSearchParams({schema: TheatreQueryOptionSchema});

    const query = useFetchPaginatedTheatres({
        page,
        perPage: THEATRES_PER_PAGE,
        queries: searchParams,
        config: {virtuals: true, populate: true},
    });

    return (
       <QueryErrorBoundary statusTextOverride={TheatreHttpStatusOverrideText}>
           <ValidatedDataLoader
               query={query}
               schema={PaginatedTheatreDetailsSchema}
           >
               {({items, totalItems}: PaginatedTheatreDetails) => (
                   <TheatreIndexPageContent
                       theatres={items}
                       page={page}
                       perPage={THEATRES_PER_PAGE}
                       setPage={setPage}
                       totalItems={totalItems}
                   />
               )}
           </ValidatedDataLoader>
       </QueryErrorBoundary>
    );
};

export default TheatreIndexPage;
