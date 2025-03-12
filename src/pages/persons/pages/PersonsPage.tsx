import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PersonCardList from "@/pages/persons/components/PersonCardList.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import useFetchPaginatedPersons from "@/pages/persons/hooks/useFetchPaginatedPersons.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import PersonIndexHeader from "@/pages/persons/components/headers/PersonIndexHeader.tsx";

const PersonsPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedPersons({page, perPage, filters: {}});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    const {items: persons} = data;

    return (
        <PageFlexWrapper>
            <PersonIndexHeader />

            <section className="flex-1 space-y-3">
                <PersonCardList
                    persons={persons}
                    onPersonDelete={() => refetch()}
                />
            </section>
        </PageFlexWrapper>
    );
};

export default PersonsPage;
