/**
 * @fileoverview Page component for displaying a paginated list of movie showings with filtering options.
 */

import {ReactElement} from "react";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import useParsedPaginationValue from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";

import {ShowingIndexPageContent} from "@/views/admin/showings/_pages/index-page/content.tsx";
import {ShowingDetailsSchema, ShowingQueryOptionSchema, useFetchPaginatedShowings} from "@/domains/showings";

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
