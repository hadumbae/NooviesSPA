import {FC} from 'react';
import useFetchPersonParams from "@/pages/persons/hooks/params/admin/useFetchPersonParams.ts";
import useFetchPerson from "@/pages/persons/hooks/fetch/useFetchPerson.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PersonSubmitFormContainer from "@/pages/persons/components/form/admin/submit/PersonSubmitFormContainer.tsx";
import {useNavigate} from "react-router-dom";
import {Person, PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import PersonEditHeader from "@/pages/persons/components/headers/PersonEditHeader.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";

const PersonEditPage: FC = () => {
    const navigate = useNavigate();
    const urlParams = useFetchPersonParams();
    if (!urlParams) return <PageLoader />;

    const {personID} = urlParams;

    const {data, isPending, isError, error: queryError} = useFetchPerson({_id: personID});
    const {success, data: person, error: parseError} = useValidateData({isPending, data, schema: PersonSchema});

    if (isPending) return <PageLoader />;
    if (isError) return <PageHTTPError error={queryError} />;
    if (!success) return <PageParseError error={parseError} />;

    const onEdit = (person: Person) => {
        navigate(`/admin/persons/get/${person._id}`);
    }

    return (
        <PageFlexWrapper>
            <PersonEditHeader person={person} />

            <Card>
                <CardContent className="p-3">
                    <PersonSubmitFormContainer onSubmit={onEdit} isEditing={true} person={person} />
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
};

export default PersonEditPage;
