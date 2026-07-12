/**
 * @fileoverview Admin index page for browsing and managing persons.
 * Orchestrates URL state synchronization, paginated data retrieval,
 * and schema validation for the administrative person management interface.
 */

import {ReactElement} from 'react';
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import useParsedPaginationValue from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {useFetchPaginatedPersons} from "@/domains/persons/_feat/crud-hooks";
import {PersonIndexPageContent} from "@/views/admin/persons/_pages/index-page/content.tsx";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {PaginatedItems} from "@/common/types";
import {PersonQueryOptionsSchema} from "@/domains/persons/_schema/query-options/PersonQueryOptionsSchema";
import {Person, PersonSchema} from "@/domains/persons";

/** Default result set size for the person administrative grid. */
const PERSONS_PER_PAGE = 20;

/**
 * Orchestrator component for the Persons Index view.
 */
export function PersonIndexPage(): ReactElement {
    const {data: paginationState} = usePaginationLocationState();
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", paginationState?.page);
    const {searchParams} = useParsedSearchParams({schema: PersonQueryOptionsSchema});

    const query = useFetchPaginatedPersons({
        page,
        perPage: PERSONS_PER_PAGE,
        schema: generatePaginationSchema(PersonSchema),
        queries: searchParams,
        config: {populate: true, virtuals: true}
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items: persons}: PaginatedItems<Person>) => (
                <PersonIndexPageContent
                    persons={persons}
                    queryOptions={searchParams}
                    page={page}
                    perPage={PERSONS_PER_PAGE}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}