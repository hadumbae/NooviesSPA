import {FC} from 'react';
import useFetchPersonParams from "@/pages/persons/hooks/params/admin/useFetchPersonParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PersonDetailsHeader from "@/pages/persons/components/admin/person-details/PersonDetailsHeader.tsx";
import PersonDetailsBreadcrumbs from "@/pages/persons/components/admin/person-details/PersonDetailsBreadcrumbs.tsx";
import useFetchPerson from "@/pages/persons/hooks/fetch/useFetchPerson.ts";
import useFetchMovieCredits from "@/pages/moviecredit/hooks/queries/useFetchMovieCredits.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {
    MovieCreditPopulatedArraySchema, PopulatedMovieCreditArray
} from "@/pages/moviecredit/schemas/model/references/MovieCreditPopulatedArraySchema.ts";
import {PersonDetailsSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
import PersonDetailsCard from "@/pages/persons/components/admin/person-details/PersonDetailsCard.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";

const PersonDetailsPage: FC = () => {
    const urlParams = useFetchPersonParams();
    if (!urlParams) return <PageLoader/>;

    const {personID} = urlParams;

    const personQuery = useFetchPerson({_id: personID, populate: true, virtuals: true});
    const creditQuery = useFetchMovieCredits({person: personID, populate: true, limit: 6});

    const queries = [personQuery, creditQuery];
    const validationQueries: CombinedSchemaQuery[] = [
        {key: "person", query: personQuery, schema: PersonDetailsSchema},
        {key: "credits", query: creditQuery, schema: MovieCreditPopulatedArraySchema},
    ];

    return (
        <CombinedQueryBoundary queries={queries}>
            <CombinedValidatedQueryBoundary queries={validationQueries}>
                {(data) => {
                    const {person, credits} = data as { person: PersonDetails, credits: PopulatedMovieCreditArray };
                    const {name} = person;
                    console.log("Credits: ", credits);

                    return (
                        <PageFlexWrapper>
                            <PersonDetailsBreadcrumbs name={name}/>
                            <PersonDetailsHeader person={person}/>

                            <PageSection srTitle="Personal Details">
                                <PersonDetailsCard person={person} />
                            </PageSection>

                            <PageSection srTitle="Movie Credits">
                                <ol>
                                    {credits.map((credit) => <li key={credit._id}>{credit._id}</li>)}
                                </ol>
                            </PageSection>
                        </PageFlexWrapper>
                    );
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
};

export default PersonDetailsPage;
