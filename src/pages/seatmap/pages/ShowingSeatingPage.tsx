import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import useFetchShowingParams from "@/pages/showings/hooks/params/useFetchShowingParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import ShowingSeatingHeader from "@/pages/showings/components/headers/ShowingSeatingHeader.tsx";
import ShowingSeatMapFilterList from "@/pages/seatmap/components/ShowingSeatMapFilterList.tsx";
import useShowingQueryErrorHandler from "@/pages/showings/hooks/errors/useShowingQueryErrorHandler.ts";
import useFetchShowingWithSeating from "@/pages/showings/hooks/queries/seating/useFetchShowingWithSeating.ts";

const ShowingSeatingPage: FC = () => {
    const {showingID} = useFetchShowingParams();
    const {query, isPending, isError, error} = useFetchShowingWithSeating({showingID: showingID!, populate: true});

    useShowingQueryErrorHandler(error);

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error}/>;

    const {showing: {data: showing}, seating: seatingQuery} = query;


    const {items: seating} = seatingQuery.data!;
    const refetchSeating = seatingQuery.refetch;

    return (
        <PageFlexWrapper>
            <ShowingSeatingHeader showing={showing!} />

            <PageSection title="Seats" className="grid grid-cols-1 gap-4">
                <ShowingSeatMapFilterList
                    seating={seating}
                    onUpdate={() => refetchSeating()}
                    onDelete={() => refetchSeating()}
                />
            </PageSection>
        </PageFlexWrapper>
    );
};

export default ShowingSeatingPage;
