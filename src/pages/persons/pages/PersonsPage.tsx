import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PersonCardList from "@/pages/persons/components/PersonCardList.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import useFetchPaginatedPersons from "@/pages/persons/hooks/useFetchPaginatedPersons.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PersonIndexHeader from "@/pages/persons/components/headers/PersonIndexHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";

const PersonsPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedPersons({page, perPage, filters: {}});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    const {items: persons} = data;
    const hasPersons = (persons || []).length > 0;

    const onPersonDelete = () => refetch();

    return (
        <PageFlexWrapper>
            <PersonIndexHeader />

            {
                !hasPersons
                    ? <PageSection>
                        <PersonCardList persons={persons} onPersonDelete={onPersonDelete} />
                    </PageSection>
                    : <PageCenter>
                        <span className="text-neutral-400 select-none">There Are No Movies</span>
                    </PageCenter>
            }
        </PageFlexWrapper>
    );
};

export default PersonsPage;
