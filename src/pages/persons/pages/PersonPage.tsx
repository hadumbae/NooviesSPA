import {FC} from 'react';
import useFetchPersonParams from "@/pages/persons/hooks/params/admin/useFetchPersonParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import PersonDetailsHeader from "@/pages/persons/components/headers/PersonDetailsHeader.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PersonDetailsBreadcrumbs from "@/pages/persons/components/breadcrumbs/admin/PersonDetailsBreadcrumbs.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import useFetchPersonDetails from "@/pages/persons/hooks/fetch/admin/fetch-person-details/useFetchPersonDetails.ts";

const PersonPage: FC = () => {
    const urlParams = useFetchPersonParams();
    if (!urlParams) return <PageLoader />;

    const {personID} = urlParams;
    const {data, isPending, isError, queryError, parseError, parseSuccess} = useFetchPersonDetails({_id: personID});

    if (isPending) return <PageLoader />
    if (isError) return <PageHTTPError error={queryError} />
    if (!parseSuccess) return <PageParseError error={parseError} />

    const {person, movieCredits} = data;

    const {name, biography} = person!;
    console.log(movieCredits);

    return (
        <PageFlexWrapper>
            <PersonDetailsBreadcrumbs name={name} />
            <PersonDetailsHeader person={person!} />

            <section className="px-10">
                <TextQuote>{biography}</TextQuote>
            </section>

            <section>
                <ol>

                </ol>
            </section>
        </PageFlexWrapper>
    );
};

export default PersonPage;
