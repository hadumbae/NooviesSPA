import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PersonSubmitFormContainer from "@/pages/persons/components/form/admin/submit/PersonSubmitFormContainer.tsx";
import {useNavigate} from "react-router-dom";
import PersonCreateHeader from "@/pages/persons/components/headers/PersonCreateHeader.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import PersonCreateBreadcrumbs from "@/pages/persons/components/breadcrumbs/admin/PersonCreateBreadcrumbs.tsx";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import PageSection from "@/common/components/page/PageSection.tsx";

const PersonCreatePage: FC = () => {
    const navigate = useNavigate();

    const onSubmit = (person: Person) => {
        navigate(`/admin/persons/get/${person._id}`);
    };

    return (
        <PageFlexWrapper>
            <PageSection srTitle="Person Create Header">
                <PersonCreateBreadcrumbs/>
                <PersonCreateHeader/>
            </PageSection>

            <PageSection srTitle="Person Create Form">
                <Card>
                    <CardContent className="p-4">
                        <PersonSubmitFormContainer onSubmitSuccess={onSubmit}/>
                    </CardContent>
                </Card>
            </PageSection>

        </PageFlexWrapper>
    );
};

export default PersonCreatePage;
