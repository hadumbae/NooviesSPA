import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PersonIndexHeader from "@/pages/persons/components/headers/PersonIndexHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import useFetchPersonQuery from "@/pages/persons/hooks/useFetchPersonQuery.ts";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {PaginatedPersonsSchema} from "@/pages/persons/schema/PersonPaginationSchema.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import PersonListCard from "@/pages/persons/components/PersonListCard.tsx";

const PersonsPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams();

    const {data, isPending, isError, error} = useFetchPersonQuery({
        paginated: true,
        page,
        perPage,
    });

    const {data: paginatedPersons, error: parseError} = useValidateData({
        data,
        isPending,
        schema: PaginatedPersonsSchema,
        message: "Invalid Data Returned FROM API."
    })

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={error}/>;
    if (parseError) return <PageParseError error={parseError}/>;

    const {items: persons} = paginatedPersons!;
    const hasPersons = (persons || []).length > 0;

    return (
        <PageFlexWrapper>
            <PersonIndexHeader/>

            {
                hasPersons
                    ? <PageSection>
                        {persons.map((person) => <PersonListCard key={person._id} person={person}/>)}
                    </PageSection>
                    : <PageCenter>
                        <span className="text-neutral-400 select-none">There Are No People</span>
                    </PageCenter>
            }

        </PageFlexWrapper>
    );
};

export default PersonsPage;
