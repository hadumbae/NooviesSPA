import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import SeatSubmitForm from "@/pages/seats/components/SeatSubmitForm.tsx";
import {useNavigate} from "react-router-dom";
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";
import SeatCreateHeader from "@/pages/seats/components/headers/SeatCreateHeader.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";

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
                    <SeatSubmitForm onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
};

export default SeatCreatePage;
