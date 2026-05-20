/**
 * @fileoverview Page component for displaying a paginated list of movie showings with filtering options.
 */

import {ReactElement} from "react";
import ShowingIndexPageContent from "@/views/admin/showings/index-page/ShowingIndexPageContent.tsx";
import {useFetchPaginatedShowings} from "@/domains/showings/_feat/crud-hooks/useFetchPaginatedShowings.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import useParsedPaginationValue
    from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {ShowingDetailsSchema} from "@/domains/showings/schema/showing";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {ShowingQueryOptionSchema} from "@/domains/showings/schema/queries";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";

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
        schema: generatePaginationSchema(ShowingDetailsSchema),
        config: {populate: true, virtuals: true},
        queries: searchParams,
    });

    return (
        <QueryDataLoader query={query}>
            {({items: showings, totalItems}) => (
                <ShowingIndexPageContent
                    showings={showings}
                    totalItems={totalItems}
                    page={page}
                    perPage={SHOWINGS_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}
