/**
 * @fileoverview Public page for browsing theatres by location that have active showings.
 */

import {ReactElement} from "react";
import useParsedPaginationValue
    from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {
    BrowseTheatreListPageContent
} from "src/views/client/theatres/browse-theatre-page/content.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import {BrowseTheatreParamSchema} from "@/domains/theatres/_feat/submit-location";
import {PaginatedTheatresWithRecentShowings} from "@/domains/theatres/schema/theatre";
import {useFetchTheatresByLocation} from "@/domains/theatres/_feat/search-theatres";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";

const THEATRES_PER_PAGE = 20;

/**
 * Top-level theatre browse page that coordinates search parameter parsing and paginated data fetching.
 */
export function BrowseTheatreListPage(): ReactElement {
    useTitle("Browse Theatres");

    const {searchParams} = useParsedSearchParams({schema: BrowseTheatreParamSchema});
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchTheatresByLocation({
        page,
        perPage: THEATRES_PER_PAGE,
        target: searchParams.target,
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items}: PaginatedTheatresWithRecentShowings) => (
                <BrowseTheatreListPageContent
                    page={page}
                    perPage={THEATRES_PER_PAGE}
                    totalTheatres={totalItems}
                    setPage={setPage}
                    theatres={items}
                />
            )}
        </QueryDataLoader>
    );
}