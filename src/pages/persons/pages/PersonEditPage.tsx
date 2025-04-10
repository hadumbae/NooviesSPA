import {FC} from 'react';
import useFetchPersonParams from "@/pages/persons/hooks/useFetchPersonParams.ts";
import useFetchPerson from "@/pages/persons/hooks/useFetchPerson.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PersonSubmitForm from "@/pages/persons/components/PersonSubmitForm.tsx";
import {useNavigate} from "react-router-dom";
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import PersonEditHeader from "@/pages/persons/components/headers/PersonEditHeader.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";

const PersonEditPage: FC = () => {
    const navigate = useNavigate();
    const {personID} = useFetchPersonParams();
    const {data: person, isPending, isError, error} = useFetchPerson({_id: personID!});

    const onEdit = (person: Person) => {
        navigate(`/admin/persons/get/${person._id}`);
    }

    if (isPending) return <PageLoader />
    if (isError) return <PageError error={error} />

    return (
        <PageFlexWrapper>
            <PersonEditHeader person={person} />

            <Card>
                <CardContent className="p-3">
                    <PersonSubmitForm onSubmit={onEdit} person={person} />
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
};

export default PersonEditPage;
