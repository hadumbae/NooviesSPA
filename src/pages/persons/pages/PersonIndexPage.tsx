import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PersonIndexHeader from "@/pages/persons/components/headers/PersonIndexHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import useFetchPersons from "@/pages/persons/hooks/fetch/useFetchPersons.ts";
import {PaginatedPersons, PaginatedPersonsSchema} from "@/pages/persons/schema/PersonPaginationSchema.ts";
import PersonListCard from "@/pages/persons/components/PersonListCard.tsx";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import usePaginationLocationState from "@/common/hooks/params/usePaginationLocationState.ts";
import EllipsisPaginationButtons from "@/common/components/pagination/EllipsisPaginationButtons.tsx";

const PersonIndexPage: FC = () => {
    const {data: paginationState} = usePaginationLocationState();
    const {page, perPage, setPage} = usePaginationSearchParams(paginationState ?? {page: 1, perPage: 20});

    const query = useFetchPersons({paginated: true, page, perPage});

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary
                query={query}
                schema={PaginatedPersonsSchema}
                message={"Invalid Data Returned FROM API."}
            >
                {
                    ({totalItems, items: persons}: PaginatedPersons) => {
                        const hasPersons = persons.length > 0;

                        const personSection = (
                            <PageSection className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {persons.map((person) => <PersonListCard key={person._id} person={person}/>)}
                            </PageSection>
                        );

                        const emptySection = (
                            <PageCenter>
                                <span className="text-neutral-400 select-none">There Are No People</span>
                            </PageCenter>
                        );

                        const paginationButtons = (
                            (totalItems > perPage) &&
                            <EllipsisPaginationButtons
                                page={page}
                                perPage={perPage}
                                totalItems={totalItems}
                                setPage={setPage}/>
                        );

                        return (
                            <PageFlexWrapper>
                                <PersonIndexHeader/>

                                {hasPersons ? personSection : emptySection}

                                {paginationButtons}
                            </PageFlexWrapper>
                        );
                    }
                }
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default PersonIndexPage;
