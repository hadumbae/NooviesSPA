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

import {useFetchTheatresByLocation} from "@/pages/theatres/hooks/features/browse/useFetchTheatresByLocation.ts";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {BrowseTheatreParamSchema} from "@/pages/theatres/schema/params/client/browse-theatre-list/BrowseTheatreParamSchema.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {PaginatedTheatresWithRecentShowingsSchema} from "@/pages/theatres/schema/model/theatre/TheatreWithRecentShowings.schema.ts";
import BrowseTheatreListPageContent from "@/features/client/theatres/browse-theatre/BrowseTheatreListPageContent.tsx";
import {PaginatedTheatresWithRecentShowings} from "@/pages/theatres/schema/model/theatre/TheatreWithRecentShowings.types.ts";
import useTitle from "@/common/hooks/document/useTitle.ts";

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
