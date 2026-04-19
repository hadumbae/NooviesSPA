/**
 * @fileoverview Admin index page for browsing and managing persons.
 * Orchestrates URL state synchronization, paginated data retrieval,
 * and schema validation for the administrative person management interface.
 */

import {ReactElement} from 'react';
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import {PaginatedPersonDetailsSchema} from "@/domains/persons/schema/person/Person.schema.ts";
import {PaginatedPersonDetails} from "@/domains/persons/schema/person/Person.types.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {PersonQueryOptionsSchema} from "@/domains/persons/schema/query-options/PersonQueryOption.schema.ts";
import useParsedPaginationValue
    from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchPaginatedPersons} from "@/domains/persons/_feat/crud-hooks";
import {PersonIndexPageContent} from "@/views/admin/persons/index-page/content.tsx";

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
        schema: PaginatedPersonDetailsSchema,
        pagination: {page, perPage: PERSONS_PER_PAGE},
        queries: searchParams,
        config: {populate: true, virtuals: true}
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items: persons}: PaginatedPersonDetails) => (
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