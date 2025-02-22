import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import QueryErrorHandler from "@/common/components/errors/QueryErrorHandler.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingSeatMapEditHeader from "@/pages/seatmap/components/headers/ShowingSeatMapEditHeader.tsx";
import useFetchShowingSeatMapParams from "@/pages/seatmap/hooks/params/useFetchShowingSeatMapParams.ts";
import ShowingSeatMapSubmitForm from "@/pages/seatmap/components/forms/ShowingSeatMapSubmitForm.tsx";
import {useNavigate} from "react-router-dom";
import {SeatMap, SeatMapSchema} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import useShowingSeatMapQueryErrorHandler from "@/pages/seatmap/hooks/errors/useShowingSeatMapQueryErrorHandler.ts";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {Showing, ShowingSchema} from "@/pages/showings/schema/ShowingSchema.ts";
import useFetchShowingAndSeatMap from "@/pages/seatmap/hooks/queries/useFetchShowingAndSeatMap.ts";

const ShowingSeatMapEditPage: FC = () => {
    const navigate = useNavigate();
    const {showingID, seatMapID} = useFetchShowingSeatMapParams();

    const fetchReturns = useFetchShowingAndSeatMap({showingID, seatMapID, populate: true});

    const {showing: showingData, seatMap: seatMapData} = fetchReturns;
    const {isPending, isError, error} = fetchReturns;

    useShowingSeatMapQueryErrorHandler(error);

    const showing = useValidateData<typeof ShowingSchema, Showing>({
        schema: ShowingSchema,
        data: showingData,
    });

    const seatMap = useValidateData<typeof SeatMapSchema, SeatMap>({
        schema: SeatMapSchema,
        data: seatMapData,
    });

    if (isPending) return <PageLoader />;
    if (isError) {
        return <QueryErrorHandler error={error!}>
            <PageError error={error}/>
        </QueryErrorHandler>;
    }

    const onSubmit = (seatMap: SeatMap) => {
        navigate(`/admin/showings/get/${seatMap.showing}/seating`);
    }

    return (
        <PageFlexWrapper>
            <ShowingSeatMapEditHeader seatMap={seatMap!} showing={showing!} />

            <ShowingSeatMapSubmitForm
                showing={showing!}
                seatMap={seatMap!}
                onSubmit={onSubmit}
            />
        </PageFlexWrapper>
    );
};

export default ShowingSeatMapEditPage;

// http://localhost:3000/admin/showings/get/6789271603a6405ee63710f9/seating
// http://localhost:3000/admin/showings/get/679f3727f6820d918d2bad36/seating
// http://localhost:3000/admin/showings/get/6789271603a6405ee63710f9/seating