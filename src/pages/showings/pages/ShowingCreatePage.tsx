import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingCreateHeader from "@/pages/showings/components/headers/ShowingCreateHeader.tsx";
import ShowingSubmitFormContainer from "@/pages/showings/components/forms/ShowingSubmitFormContainer.tsx";
import {useNavigate} from "react-router-dom";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";

const ShowingCreatePage: FC = () => {
    const navigate = useNavigate();
    const onSubmit = ({_id}: Showing) => {
        navigate(`/admin/showings/get/${_id}`);
    }

    return (
        <PageFlexWrapper>
            <ShowingCreateHeader />

            <Card>
                <CardContent className="p-3">
                    <ShowingSubmitFormContainer onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
};

export default ShowingCreatePage;
