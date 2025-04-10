import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PersonSubmitForm from "@/pages/persons/components/PersonSubmitForm.tsx";
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {useNavigate} from "react-router-dom";
import PersonCreateHeader from "@/pages/persons/components/headers/PersonCreateHeader.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";

const PersonCreatePage: FC = () => {
    const navigate = useNavigate();
    const onSubmit = (person: Person) => {
        navigate(`/admin/persons/get/${person._id}`);
    };

    return (
        <PageFlexWrapper>
            <PersonCreateHeader />

            <Card>
                <CardContent className="p-4">
                    <PersonSubmitForm onSubmit={onSubmit} />
                </CardContent>
            </Card>

        </PageFlexWrapper>
    );
};

export default PersonCreatePage;
