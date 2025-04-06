import {FC} from 'react';
import useFetchPerson from "@/pages/persons/hooks/useFetchPerson.ts";
import useFetchPersonParams from "@/pages/persons/hooks/useFetchPersonParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import PersonDetailsHeader from "@/pages/persons/components/headers/PersonDetailsHeader.tsx";

const PersonPage: FC = () => {
    const {personID} = useFetchPersonParams();
    const {data: person, isPending, isError, error} = useFetchPerson({_id: personID!});

    if (isPending) return <PageLoader />
    if (isError) return <PageError error={error} />

    const {biography} = person;

    return (
        <PageFlexWrapper>
            <PersonDetailsHeader person={person} />

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
