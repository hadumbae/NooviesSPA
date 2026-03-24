/**
 * @file PersonIndexPage.tsx
 *
 * Admin index page for browsing and managing persons.
 *
 * Responsibilities:
 * - Parses query and pagination state from the URL
 * - Fetches paginated person data
 * - Validates API responses with Zod
 * - Delegates rendering to {@link PersonIndexPageContent}
 */

import {FC} from 'react';
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import {PaginatedPersonDetailsSchema} from "@/domains/persons/schema/person/Person.schema.ts";
import {PaginatedPersonDetails} from "@/domains/persons/schema/person/Person.types.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {PersonQueryOptionsSchema} from "@/domains/persons/schema/queries/PersonQueryOption.schema.ts";
import {useFetchPaginatedPersons} from "@/domains/persons/hooks/fetch/useFetchPaginatedPersons.ts";
import useParsedPaginationValue from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import PersonIndexPageContent from "@/domains/persons/pages/index-page/PersonIndexPageContent.tsx";

const PERSONS_PER_PAGE = 20;

/**
 * Paginated index page displaying all registered persons.
 *
 * Integrates:
 * - URL-driven filtering and pagination
 * - Server-side querying
 * - Schema-validated data loading
 *
 * @example
 * ```tsx
 * <PersonIndexPage />
 * ```
 */
const PersonIndexPage: FC = () => {
    const {data: paginationState} = usePaginationLocationState();
    const {searchParams} = useParsedSearchParams({schema: PersonQueryOptionsSchema});
    const {value: page, setValue: setPage} =
        useParsedPaginationValue("page", paginationState?.page);

    const query = useFetchPaginatedPersons({
        page,
        perPage: PERSONS_PER_PAGE,
        queries: searchParams,
        config: {populate: true, virtuals: true}
    });

    return (
        <ValidatedDataLoader query={query} schema={PaginatedPersonDetailsSchema}>
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
        </ValidatedDataLoader>
    );
};

export default PersonIndexPage;

// http://localhost:3000/admin/persons/get/alice-morgan-owppcc