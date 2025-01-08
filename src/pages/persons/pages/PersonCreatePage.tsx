import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import PersonSubmitForm from "@/pages/persons/components/PersonSubmitForm.tsx";
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {useNavigate} from "react-router-dom";

const PersonCreatePage: FC = () => {
    const navigate = useNavigate();
    const onSubmit = (person: Person) => {
        navigate(`/admin/persons/get/${person._id}`);
    };

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>Create Person</HeaderTitle>
                <HeaderDescription>Record people here. Fill in the details and click on `Submit` to continue.</HeaderDescription>
            </header>

            <section>
                <PersonSubmitForm onSubmit={onSubmit} />
            </section>

        </PageFlexWrapper>
    );
};

export default PersonCreatePage;
