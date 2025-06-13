import {FC} from 'react';
import useFetchPerson from "@/pages/persons/hooks/useFetchPerson.ts";
import useFetchPersonParams from "@/pages/persons/hooks/useFetchPersonParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import PersonDetailsHeader from "@/pages/persons/components/headers/PersonDetailsHeader.tsx";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";

const PersonPage: FC = () => {
    const {personID} = useFetchPersonParams();
    const {data, isPending, isError, error: queryError} = useFetchPerson({_id: personID!});
    const {data: person, error: parseError} = useValidateData({data, isPending, schema: PersonSchema});

    if (isPending) return <PageLoader />
    if (isError) return <PageHTTPError error={queryError} />
    if (parseError) return <PageHTTPError error={parseError} />

    const {biography} = person!;

    return (
        <PageFlexWrapper>
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
