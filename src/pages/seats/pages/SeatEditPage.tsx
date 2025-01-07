import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/HeaderDescription.tsx";
import SeatSubmitForm from "@/pages/seats/components/SeatSubmitForm.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import {useNavigate} from "react-router-dom";
import useFetchSeatParams from "@/pages/seats/hooks/useFetchSeatParams.ts";
import useFetchSeat from "@/pages/seats/hooks/useFetchSeat.ts";

const SeatEditPage: FC = () => {
    const navigate = useNavigate();
    const {seatID} = useFetchSeatParams();
    const {data: seat, isPending, isError, error} = useFetchSeat({_id: seatID!});

    const onSubmit = () => {
        navigate(`/admin/seats/get/${seat && seat._id}`);
    }

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />

    const {row, seatNumber} = seat;

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{seatNumber} ({row})</HeaderTitle>
                <HeaderDescription>
                    Edit the seat ({seatNumber}) here. Click on 'Submit' to proceed.
                </HeaderDescription>
            </header>

            <section>
                <SeatSubmitForm seat={seat} onSubmit={() => onSubmit()} />
            </section>
        </PageFlexWrapper>
    );
};

export default SeatEditPage;
