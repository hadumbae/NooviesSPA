import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useFetchPerson from "@/pages/persons/hooks/useFetchPerson.ts";
import useFetchPersonParams from "@/pages/persons/hooks/useFetchPersonParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {PersonPopulatedSchema} from "@/pages/persons/schema/PersonPopulatedSchema.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import PersonImageDetailsBreadcrumbs
    from "@/pages/persons/components/breadcrumbs/admin/PersonImageDetailsBreadcrumbs.tsx";
import PersonProfileImageHeader from "@/pages/persons/components/headers/PersonProfileImageHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import UploadPersonProfileImageFormContainer
    from "@/pages/persons/components/form/admin/profile-image/UploadPersonProfileImageFormContainer.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";

const PersonImagePage: FC = () => {
    const urlParams = useFetchPersonParams();
    if (!urlParams) return <PageLoader/>;

    const {personID} = urlParams;

    const {data, isPending, isError, error: queryError} = useFetchPerson({_id: personID, populate: true});
    const {success, data: person, error: parseError} = useValidateData({
        data,
        isPending,
        schema: PersonPopulatedSchema,
        message: "API Response Validation Failed.",
    });

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!success) return <PageParseError error={parseError}/>;

    const {_id, name} = person;

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
                        <UploadPersonProfileImageFormContainer personID={personID}/>
                    </CardContent>
                </Card>
            </PageSection>
        </PageFlexWrapper>
    );
};

export default PersonImagePage;
