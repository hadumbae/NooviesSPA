/**
 * @fileoverview Page component for browsing the persons directory with pagination and search support.
 */

import {ReactElement} from "react";
import {BrowsePersonsQueryOptionsSchema, useFetchBrowsePersonsViewData} from "@/domains/persons/_feat/client-view-data";
import {useParsedPaginationValue} from "@/common/_feat/fetch-pagination-search-params";
import {useParsedSearchParams} from "@/common/_feat";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {BrowsePersonsPageContent} from "@/views/client/persons/_pages/browse-page/content.tsx";

const PERSONS_PER_PAGE = 20;

/**
 * Renders the persons browsing page, managing data fetching and pagination state via URL search parameters.
 */
export function BrowsePersonsPage(): ReactElement {
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