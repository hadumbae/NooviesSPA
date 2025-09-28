import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PersonIndexHeader from "@/pages/persons/components/headers/PersonIndexHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import useFetchPersons from "@/pages/persons/hooks/fetch/useFetchPersons.ts";
import PersonIndexCard from "@/pages/persons/components/PersonIndexCard.tsx";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import usePaginationLocationState from "@/common/hooks/params/usePaginationLocationState.ts";
import EllipsisPaginationButtons from "@/common/components/pagination/EllipsisPaginationButtons.tsx";
import {PaginatedPersonsSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {PaginatedPersons} from "@/pages/persons/schema/person/Person.types.ts";

/**
 * Page component for displaying a paginated list of persons (actors, crew, etc.).
 *
 * @remarks
 * - Fetches paginated person data from the API using {@link useFetchPersons}.
 * - Validates the returned data against {@link PaginatedPersonsSchema}.
 * - Displays persons in a responsive grid using {@link PersonIndexCard}.
 * - Shows an empty state when there are no persons.
 * - Includes pagination controls with {@link EllipsisPaginationButtons}.
 * - Renders the page header with {@link PersonIndexHeader}.
 *
 * @example
 * ```tsx
 * <PersonIndexPage />
 * ```
 */
const PersonIndexPage: FC = () => {
    // Get pagination state from location or default
    const {data: paginationState} = usePaginationLocationState();
    const {page, perPage, setPage} = usePaginationSearchParams(paginationState ?? {page: 1, perPage: 20});

    // Fetch paginated persons data
    const query = useFetchPersons({queries: {paginated: true, page, perPage}});

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary
                query={query}
                schema={PaginatedPersonsSchema}
                message={"Invalid Data Returned FROM API."}
            >
                {({totalItems, items: persons}: PaginatedPersons) => {
                    const hasPersons = persons.length > 0;

                    // Section displaying persons in a responsive grid
                    const personSection = (
                        <PageSection className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {persons.map((person) => (
                                <PersonIndexCard key={person._id} person={person} />
                            ))}
                        </PageSection>
                    );

                    // Empty state section when no persons exist
                    const emptySection = (
                        <PageCenter>
                            <span className="text-neutral-400 select-none">There Are No People</span>
                        </PageCenter>
                    );

                    // Pagination buttons if total items exceed items per page
                    const paginationButtons = (
                        (totalItems > perPage) &&
                        <EllipsisPaginationButtons
                            page={page}
                            perPage={perPage}
                            totalItems={totalItems}
                            setPage={setPage}
                        />
                    );

                    return (
                        <PageFlexWrapper>
                            <PersonIndexHeader />

                            {hasPersons ? personSection : emptySection}

                            {paginationButtons}
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default PersonIndexPage;
