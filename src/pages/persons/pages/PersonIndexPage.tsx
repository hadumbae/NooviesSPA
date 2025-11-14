import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import PersonIndexHeader from "@/pages/persons/components/headers/PersonIndexHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import useFetchPersons from "@/pages/persons/hooks/fetch/useFetchPersons.ts";
import PersonIndexCard from "@/pages/persons/components/PersonIndexCard.tsx";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {PaginatedPersonsSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {PaginatedPersons} from "@/pages/persons/schema/person/Person.types.ts";
import PersonQueryOptionFormContainer
    from "@/pages/persons/components/features/admin/person-query-options/PersonQueryOptionFormContainer.tsx";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {PersonQueryOptionsSchema} from "@/pages/persons/schema/queries/PersonQueryOption.schema.ts";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";

/**
 * **Person Index Page**
 *
 * A paginated page component displaying all registered persons (e.g., actors, crew members).
 * This page provides integrated filtering, sorting, and pagination using search parameters.
 *
 * @remarks
 * This component orchestrates several layers:
 *
 * - **Search Parameters:** Managed via {@link useParsedSearchParams} and {@link usePaginationSearchParams}.
 * - **Data Fetching:** Handled by {@link useFetchPersons}, returning paginated person results.
 * - **Validation:** Data is verified using {@link ValidatedQueryBoundary} with {@link PaginatedPersonsSchema}.
 * - **Presentation:** Persons are rendered as responsive cards via {@link PersonIndexCard}.
 * - **UI Enhancements:** Includes filters in a modal dialog, pagination buttons, and empty state messaging.
 *
 * @structure
 * - Header: {@link PersonIndexHeader}
 * - Filters: {@link PresetFilterDialog} + {@link PersonQueryOptionFormContainer}
 * - Grid: {@link PageSection} (person cards)
 * - Pagination: {@link PaginationRangeButtons}
 * - Wrapper: {@link PageFlexWrapper}
 *
 * @example
 * ```tsx
 * // Displays the paginated list of persons with filters and pagination
 * <PersonIndexPage />
 * ```
 *
 * @see {@link useFetchPersons} – Fetches paginated person data.
 * @see {@link PersonQueryOptionFormContainer} – Provides the filtering form.
 * @see {@link PaginatedPersonsSchema} – Schema validation for API response.
 * @see {@link PaginationRangeButtons} – Handles multi-page navigation.
 * @see {@link PresetFilterDialog} – Wraps the filter form in a modal.
 */
const PersonIndexPage: FC = () => {
    // ⚡ State and Search Params ⚡
    const {data: paginationState} = usePaginationLocationState();
    const {searchParams} = useParsedSearchParams({schema: PersonQueryOptionsSchema});
    const {page, perPage, setPage} = usePaginationSearchParams(paginationState ?? {page: 1, perPage: 20});

    // ⚡ Query ⚡
    const query = useFetchPersons({
        queries: {
            paginated: true,
            page,
            perPage,
            ...searchParams,
        }
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary
                query={query}
                schema={PaginatedPersonsSchema}
                message={"Invalid Data Returned FROM API."}
            >
                {({totalItems, items: persons}: PaginatedPersons) => {
                    // ⚡ Props ⚡

                    const hasPersons = persons.length > 0;

                    // ⚡ Sections ⚡

                    const personSection = (
                        <PageSection className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {persons.map((person) => <PersonIndexCard key={person._id} person={person}/>)}
                        </PageSection>
                    );

                    // Empty state section when no persons exist
                    const emptySection = (
                        <PageCenter>
                            <span className="text-neutral-400 select-none">There Are No People</span>
                        </PageCenter>
                    );

                    return (
                        <PageFlexWrapper>
                            <PersonIndexHeader/>

                            <PresetFilterDialog
                                title="Person Filters"
                                description="Filter and sort persons."
                            >
                                <ScrollArea className="max-h-[80vh]">
                                    <ScrollBar/>
                                    <PersonQueryOptionFormContainer presetValues={searchParams}/>
                                </ScrollArea>
                            </PresetFilterDialog>

                            {hasPersons ? personSection : emptySection}

                            {
                                (totalItems > perPage) &&
                                <PaginationRangeButtons
                                    page={page}
                                    perPage={perPage}
                                    totalItems={totalItems}
                                    setPage={setPage}
                                />
                            }
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default PersonIndexPage;
