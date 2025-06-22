import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import SeatDetailsHeader from "@/pages/seats/components/headers/SeatDetailsHeader.tsx";
import useFetchSeatParams from "@/pages/seats/hooks/params/useFetchSeatParams.ts";
import useFetchSeat from "@/pages/seats/hooks/fetch/useFetchSeat.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import SeatDetailsCard from "@/pages/seats/components/SeatDetailsCard.tsx";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";

const SeatPage: FC = () => {
    const {seatID} = useFetchSeatParams();
    const {data, isPending, isError, error: queryError} = useFetchSeat({_id: seatID!});
    const {data: seat, error: parseError, success} = useValidateData({
        data,
        isPending,
        schema: SeatSchema,
        message: "Invalid Seat Data.",
    });

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!success) return <PageParseError error={parseError}/>;

    return (
        <PageFlexWrapper>
            <SeatDetailsHeader seat={seat}/>

            <SeatDetailsCard seat={seat}/>
        </PageFlexWrapper>
    );
};

export default SeatPage;
