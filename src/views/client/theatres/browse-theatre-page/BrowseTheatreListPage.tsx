/**
 * @file BrowseTheatreListPage.tsx
 *
 * Public page for browsing theatres by location.
 *
 * Displays only theatres that currently have
 * associated showings available for booking.
 *
 * Responsibilities:
 * - Parse and validate browse + pagination search parameters
 * - Fetch paginated theatre results **with recent showings**
 * - Exclude theatres with no active or upcoming showings
 * - Handle loading, error, and schema validation states
 * - Delegate rendering to {@link BrowseTheatreListPageContent}
 */

import useParsedPaginationValue from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import BrowseTheatreListPageContent from "@/views/client/theatres/browse-theatre-page/BrowseTheatreListPageContent.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import {BrowseTheatreParamSchema} from "@/domains/theatres/_feat/submit-location";
import {useFetchTheatresByLocation} from "@/domains/theatres/_feat/browse/useFetchTheatresByLocation.ts";
import {
    PaginatedTheatresWithRecentShowings,
    PaginatedTheatresWithRecentShowingsSchema
} from "@/domains/theatres/schema/theatre/PaginatedTheatresWithRecentShowingsSchema.ts";

/** Number of theatres displayed per page */
const THEATRES_PER_PAGE = 20;

/**
 * Top-level theatre browse page.
 *
 * Coordinates:
 * - Page title management
 * - Query parameter parsing
 * - Paginated data fetching
 * - Filtering to theatres with recent or upcoming showings
 * - Schema-validated data rendering
 */
const BrowseTheatreListPage = () => {
    useTitle("Browse Theatres");

    const {searchParams: {target}} = useParsedSearchParams({
        schema: BrowseTheatreParamSchema,
    });

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchTheatresByLocation({
        page,
        perPage: THEATRES_PER_PAGE,
        target,
    });

    return (
        <ValidatedDataLoader query={query} schema={PaginatedTheatresWithRecentShowingsSchema}>
            {({totalItems, items}: PaginatedTheatresWithRecentShowings) => (
                <BrowseTheatreListPageContent
                    page={page}
                    perPage={THEATRES_PER_PAGE}
                    totalTheatres={totalItems}
                    setPage={setPage}
                    theatres={items}
                />
            )}
        </ValidatedDataLoader>
    );
};

export default BrowseTheatreListPage;
