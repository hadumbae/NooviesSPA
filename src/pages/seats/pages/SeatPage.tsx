import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import SeatDetailsHeader from "@/pages/seats/components/headers/SeatDetailsHeader.tsx";
import useFetchSeatParams from "@/pages/seats/hooks/useFetchSeatParams.ts";
import useFetchSeat from "@/pages/seats/hooks/useFetchSeat.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import SeatDetailsCard from "@/pages/seats/components/SeatDetailsCard.tsx";

const SeatPage: FC = () => {
    const {seatID} = useFetchSeatParams();
    const {data: seat, isPending, isError, error} = useFetchSeat({_id: seatID!});

    if (isPending) return <PageLoader/>;
    if (isError) return <PageError error={error}/>;

    return (
        <PageFlexWrapper>
            <SeatDetailsHeader seat={seat}/>

            <SeatDetailsCard seat={seat}/>
        </PageFlexWrapper>
    );
};

export default SeatPage;
