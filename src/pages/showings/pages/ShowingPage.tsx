import {FC} from 'react';

import useFetchShowing from "@/pages/showings/hooks/queries/useFetchShowing.ts";
import useFetchShowingParams from "@/pages/showings/hooks/params/useFetchShowingParams.ts";

import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";

import ShowingDetailsHeader from "@/pages/showings/components/headers/ShowingDetailsHeader.tsx";
import ShowingDetailsCard from "@/pages/showings/components/details/ShowingDetailsCard.tsx";
import ShowingSeatMapCompactList from "@/pages/showings/components/seatmap/ShowingSeatMapCompactList.tsx";
import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import {Link} from "react-router-dom";


const ShowingPage: FC = () => {
    const {showingID} = useFetchShowingParams();
    const {data: showing, isPending, isError, error} = useFetchShowing({_id: showingID!});

    if (isPending) return <PageLoader />
    if (isError) return <PageError error={error} />

    const {seating}  = showing;

    return (
        <PageFlexWrapper>
            <ShowingDetailsHeader showing={showing} />

            <section>
                <ShowingDetailsCard showing={showing} />
            </section>

            <PageSection title="Seating">
                <ShowingSeatMapCompactList seating={seating as SeatMap[]} />

                <div className="flex justify-end">
                    <Link to={`/admin/showings/get/${showingID}/seating`}
                        className="text-neutral-500 hover:underline hover:text-black"
                    >
                        &gt; More Details
                    </Link>
                </div>
            </PageSection>
        </PageFlexWrapper>
    );
};

export default ShowingPage;
