import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import useFetchShowingParams from "@/pages/showings/hooks/params/useFetchShowingParams.ts";
import useFetchShowing from "@/pages/showings/hooks/queries/useFetchShowing.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import ShowingSeatingHeader from "@/pages/showings/components/headers/ShowingSeatingHeader.tsx";
import ShowingSeatMapFilterList from "@/pages/seatmap/components/ShowingSeatMapFilterList.tsx";
import ShowingSeatingSubHeader from "@/pages/showings/components/headers/ShowingSeatingSubHeader.tsx";

const ShowingSeatingPage: FC = () => {
    const {showingID} = useFetchShowingParams();
    const {data: showing, isPending, isError, error} = useFetchShowing({_id: showingID!});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    return (
        <PageFlexWrapper>
            <div className="space-y-2">
                <ShowingSeatingHeader showing={showing} />
                <ShowingSeatingSubHeader showing={showing} />
            </div>

            <PageSection title="Seats">
                <ShowingSeatMapFilterList showingID={showing._id} />
            </PageSection>
        </PageFlexWrapper>
    );
};

export default ShowingSeatingPage;
