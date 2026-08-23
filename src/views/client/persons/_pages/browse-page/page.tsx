/**
 * @fileoverview Page component for browsing the persons directory with pagination and search support.
 */

import {ReactElement} from "react";
import {useFetchBrowsePersonsViewData} from "@/domains/persons/_feat/client-view-data";
import {BrowsePersonsQueryOptionsSchema} from "@/domains/persons/_feat/validate-query-options";
import {useParsedPaginationValue} from "@/common/_feat/fetch-pagination-search-params";
import {useParsedSearchParams, useTitle} from "@/common/_feat";
import {QueryDataLoader} from "@/views/common/_feat";
import {BrowsePersonsPageContent} from "@/views/client/persons/_pages/browse-page/content.tsx";

const PERSONS_PER_PAGE = 20;

/**
 * Renders the persons browsing page, managing data fetching and pagination state via URL search parameters.
 */
export function BrowsePersonsPage(): ReactElement {
    useTitle("Browse • People")

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams} = useParsedSearchParams({schema: BrowsePersonsQueryOptionsSchema});

    const query = useFetchBrowsePersonsViewData({
        page,
        perPage: PERSONS_PER_PAGE,
        queries: searchParams,
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items}) => (
                <BrowsePersonsPageContent
                    persons={items}
                    totalPersons={totalItems}
                    page={page}
                    perPage={PERSONS_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}