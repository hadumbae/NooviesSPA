/**
 * @fileoverview Page component for displaying a paginated list of movie showings with filtering options.
 */

import {ReactElement} from "react";
import ShowingIndexPageContent from "@/domains/showings/pages/index-page/ShowingIndexPageContent.tsx";
import useFetchPaginatedShowings from "@/domains/showings/hooks/queries/useFetchPaginatedShowings.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import useParsedPaginationValue
    from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing";
import {PaginatedItems} from "@/common/types";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {ShowingQueryOptionSchema} from "@/domains/showings/schema/queries";

const SHOWINGS_PER_PAGE = 10;

/**
 * Orchestrates data fetching and pagination state for the showings index view.
 */
export function ShowingIndexPage(): ReactElement {
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams} = useParsedSearchParams({schema: ShowingQueryOptionSchema});

    const query = useFetchPaginatedShowings({
        page,
        perPage: SHOWINGS_PER_PAGE,
        config: {populate: true, virtuals: true},
        queries: searchParams,
    });

    return (
        <ValidatedDataLoader query={query} schema={generatePaginationSchema(ShowingDetailsSchema)}>
            {({items: showings, totalItems}: PaginatedItems<ShowingDetails>) => (
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
}
