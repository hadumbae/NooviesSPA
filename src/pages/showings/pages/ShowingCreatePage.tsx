import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingCreateHeader from "@/pages/showings/components/headers/ShowingCreateHeader.tsx";
import ShowingSubmitForm from "@/pages/showings/components/ShowingSubmitForm.tsx";
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import {useNavigate} from "react-router-dom";

const ShowingCreatePage: FC = () => {
    const navigate = useNavigate();
    const onSubmit = ({_id}: Showing) => {
        navigate(`/admin/showings/get/${_id}`);
    }

    return (
        <PageFlexWrapper>
            <ShowingCreateHeader />

            <section>
                <ShowingSubmitForm onSubmit={onSubmit} />
            </section>
        </PageFlexWrapper>
    );
};

export default ShowingCreatePage;
