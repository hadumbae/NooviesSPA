import {FC} from 'react';

import useFetchShowing from "@/pages/showings/hooks/queries/useFetchShowing.ts";
import useFetchShowingParams from "@/pages/showings/hooks/params/useFetchShowingParams.ts";

import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";

import ShowingDetailsHeader from "@/pages/showings/components/headers/ShowingDetailsHeader.tsx";
import ShowingDetailsCard from "@/pages/showings/components/details/ShowingDetailsCard.tsx";
import ShowingSeatingPageSection from "@/pages/showings/components/sections/ShowingSeatingPageSection.tsx";


const ShowingPage: FC = () => {
    const {showingID} = useFetchShowingParams();
    const {data: showing, isPending, isError, error} = useFetchShowing({_id: showingID!, populate: true});

    if (isPending) return <PageLoader />
    if (isError) return <PageError error={error} />

    const {seating}  = showing;

    return (
        <PageFlexWrapper>
            <ShowingDetailsHeader showing={showing} />

            <ShowingDetailsCard showing={showing} />

            <ShowingSeatingPageSection seating={seating} showingID={showing._id} />
        </PageFlexWrapper>
    );
};

export default ShowingPage;
