import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useFetchPerson from "@/pages/persons/hooks/fetch/useFetchPerson.ts";
import useFetchPersonParams from "@/pages/persons/hooks/params/admin/useFetchPersonParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PersonImageDetailsBreadcrumbs
    from "@/pages/persons/components/breadcrumbs/admin/PersonImageDetailsBreadcrumbs.tsx";
import PersonProfileImageHeader from "@/pages/persons/components/headers/PersonProfileImageHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import UploadPersonProfileImageFormContainer
    from "@/pages/persons/components/form/admin/profile-image/UploadPersonProfileImageFormContainer.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import {PersonDetailsSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {Person, PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
import {useNavigate} from "react-router-dom";

/**
 * Page component for managing a `Person`'s profile images.
 *
 * Features:
 * - Fetches a `Person` by ID from URL parameters.
 * - Validates API response using {@link PersonDetailsSchema}.
 * - Displays breadcrumbs and profile image header.
 * - Includes a card section for uploading a new profile image using {@link UploadPersonProfileImageFormContainer}.
 *
 * Uses {@link QueryBoundary} and {@link ValidatedQueryBoundary} for async data fetching and validation.
 *
 * @example
 * ```tsx
 * <PersonImagePage />
 * ```
 */
const PersonImagePage: FC = () => {
    const urlParams = useFetchPersonParams();
    if (!urlParams) return <PageLoader/>;

    const {personID} = urlParams;
    const query = useFetchPerson({_id: personID, populate: true, virtuals: true});

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PersonDetailsSchema}
                                    message="API Response Validation Failed.">
                {(person: PersonDetails) => {
                    const navigate = useNavigate();
                    const {_id, name} = person;

                    const onUpdate = (person: Person) => {
                        navigate(`/admin/persons/get/${person._id}`);
                    }

                    return (
                        <PageFlexWrapper className="space-y-5">
                            <header className="space-y-5">
                                <PersonImageDetailsBreadcrumbs personID={_id} name={name}/>
                                <PersonProfileImageHeader name={name}/>
                            </header>

                            <PageSection>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upload Images</CardTitle>
                                        <CardDescription>Select an image and click on `Submit`.</CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <UploadPersonProfileImageFormContainer
                                            personID={personID}
                                            onSubmitSuccess={onUpdate}
                                        />
                                    </CardContent>
                                </Card>
                            </PageSection>
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default PersonImagePage;
