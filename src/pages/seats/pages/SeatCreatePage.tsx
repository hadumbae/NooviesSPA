import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import SeatSubmitFormContainer from "@/pages/seats/components/forms/submit-form/SeatSubmitFormContainer.tsx";
import {useNavigate} from "react-router-dom";
import SeatCreateHeader from "@/pages/seats/components/headers/SeatCreateHeader.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";

const SeatCreatePage: FC = () => {
    const navigate = useNavigate();

    const onSubmit = (seat: Seat) => {
        navigate(`/admin/seats/get/${seat._id}`);
    }

    return (
        <PageFlexWrapper>
            <SeatCreateHeader />

            <Card>
                <CardContent className="p-3">
                    <SeatSubmitFormContainer onSubmitSuccess={onSubmit} />
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
};

export default SeatCreatePage;
