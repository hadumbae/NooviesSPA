import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import SeatSubmitFormContainer from "@/pages/seats/components/forms/submit-form/SeatSubmitFormContainer.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {useNavigate} from "react-router-dom";
import useFetchSeatParams from "@/pages/seats/hooks/params/useFetchSeatParams.ts";
import useFetchSeat from "@/pages/seats/hooks/fetch/useFetchSeat.ts";
import SeatEditHeader from "@/pages/seats/components/headers/SeatEditHeader.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";

const SeatEditPage: FC = () => {
    useTitle("Edit Seat")

    const navigate = useNavigate();
    const {seatID} = useFetchSeatParams();
    const {data, isPending, isError, error: queryError} = useFetchSeat({_id: seatID!});
    const {data: seat, error: parseError, success} = useValidateData({
        data,
        isPending,
        schema: SeatSchema,
        message: "Invalid Seat Data.",
    });

    useTitle(`${seat?.row} | ${seat?.seatNumber}`)

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!success) return <PageParseError error={parseError}/>;

    const onSubmit = () => {
        navigate(`/admin/seats/get/${seat && seat._id}`);
    }

    return (
        <PageFlexWrapper>
            <SeatEditHeader seat={seat} />

            <section>
                <SeatSubmitFormContainer isEditing={true} seat={seat} onSubmitSuccess={onSubmit} />
            </section>
        </PageFlexWrapper>
    );
};

export default SeatEditPage;
