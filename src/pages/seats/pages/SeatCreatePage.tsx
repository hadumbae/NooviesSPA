import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import SeatSubmitFormContainer from "@/pages/seats/components/forms/submit-form/SeatSubmitFormContainer.tsx";
import SeatCreateHeader from "@/pages/seats/components/headers/SeatCreateHeader.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";

const SeatCreatePage: FC = () => {
    const navigate = useLoggedNavigate();

    const onSubmit = (seat: Seat) => {
        navigate({
            to: `/admin/seats/get/${seat._id}`,
            component: SeatCreatePage.name,
            message: "Navigation on seat creation.",
        });
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
