/**
 * @file ShowingIndexPage.tsx
 *
 * Admin index page for managing showings.
 */

import {FC, ReactElement} from "react";
import ShowingIndexPageContent from "@/pages/showings/pages/index-page/ShowingIndexPageContent.tsx";
import useFetchPaginatedShowings from "@/pages/showings/hooks/queries/useFetchPaginatedShowings.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {ShowingQueryOptionSchema} from "@/pages/showings/schema/queries/ShowingQueryOption.schema.ts";
import {PaginatedShowingDetailsSchema} from "@/pages/showings/schema/showing/ShowingRelated.schema.ts";
import {PaginatedShowingDetails} from "@/pages/showings/schema/showing/ShowingRelated.types.ts";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

const SHOWINGS_PER_PAGE = 10;

/**
 * Showings admin index page.
 *
 * Fetches and displays a paginated list of showings with
 * query-based filtering and schema validation.
 */
const ShowingIndexPage: FC = (): ReactElement => {
    // --- Pagination ---
    const {value: page, setValue: setPage} =
        useParsedPaginationValue("page", 1);

    const {searchParams} =
        useParsedSearchParams({schema: ShowingQueryOptionSchema});

    // --- Query ---
    const query = useFetchPaginatedShowings({
        page,
        perPage: SHOWINGS_PER_PAGE,
        config: {populate: true, virtuals: true},
        queries: searchParams,
    });

    // --- Render ---
    return (
        <ValidatedDataLoader query={query} schema={PaginatedShowingDetailsSchema}>
            {({items: showings, totalItems}: PaginatedShowingDetails) => (
                <ShowingIndexPageContent
                    showings={showings}
                    totalItems={totalItems}
                    page={page}
                    perPage={SHOWINGS_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </ValidatedDataLoader>
    );
};

export default ShowingIndexPage;
