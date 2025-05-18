import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingSeatMapEditHeader from "@/pages/seatmap/components/headers/ShowingSeatMapEditHeader.tsx";
import useFetchShowingSeatMapParams from "@/pages/seatmap/hooks/params/useFetchShowingSeatMapParams.ts";
import ShowingSeatMapSubmitForm from "@/pages/seatmap/components/forms/ShowingSeatMapSubmitForm.tsx";
import {useNavigate} from "react-router-dom";
import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import useShowingSeatMapQueryErrorHandler from "@/pages/seatmap/hooks/errors/useShowingSeatMapQueryErrorHandler.ts";
import useFetchShowingAndSeatMap from "@/pages/seatmap/hooks/queries/useFetchShowingAndSeatMap.ts";

const ShowingSeatMapEditPage: FC = () => {
    const navigate = useNavigate();
    const {showingID, seatMapID} = useFetchShowingSeatMapParams();

    const {showing, seatMap, isPending, isError, error} = useFetchShowingAndSeatMap({
        showingID,
        seatMapID,
        populate: true
    });

    useShowingSeatMapQueryErrorHandler(error);

    if (isPending) return <PageLoader/>;
    if (isError) return <PageError error={error}/>;

    const onSubmit = (seatMap: SeatMap) => {
        navigate(`/admin/showings/get/${seatMap.showing}/seating`);
    }

    return (
        <PageFlexWrapper>
            <ShowingSeatMapEditHeader seatMap={seatMap!} showing={showing!}/>

            <ShowingSeatMapSubmitForm
                showing={showing!}
                seatMap={seatMap!}
                onSubmit={onSubmit}
            />
        </PageFlexWrapper>
    );
};

export default ShowingSeatMapEditPage;