import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import SeatSubmitForm from "@/pages/seats/components/SeatSubmitForm.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import {useNavigate} from "react-router-dom";
import useFetchSeatParams from "@/pages/seats/hooks/useFetchSeatParams.ts";
import useFetchSeat from "@/pages/seats/hooks/useFetchSeat.ts";
import SeatEditHeader from "@/pages/seats/components/headers/SeatEditHeader.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";

const SeatEditPage: FC = () => {
    useTitle("Edit Seat")

    const navigate = useNavigate();
    const {seatID} = useFetchSeatParams();
    const {data: seat, isPending, isError, error} = useFetchSeat({_id: seatID!});

    useTitle(`${seat?.row} | ${seat?.seatNumber}`)

    const onSubmit = () => {
        navigate(`/admin/seats/get/${seat && seat._id}`);
    }

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />

    return (
        <PageFlexWrapper>
            <SeatEditHeader seat={seat} />

            <section>
                <SeatSubmitForm seat={seat} onSubmit={() => onSubmit()} />
            </section>
        </PageFlexWrapper>
    );
};

export default SeatEditPage;
