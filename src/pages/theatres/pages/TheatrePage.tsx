import {FC} from 'react';
import useFetchTheatreParams from "@/pages/theatres/hooks/params/useFetchTheatreParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreDetailsHeader from "@/pages/theatres/components/headers/TheatreDetailsHeader.tsx";
import TheatreDetailsCard from "@/pages/theatres/components/TheatreDetailsCard.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import useFetchTheatreDetails from "@/pages/theatres/hooks/queries/details/theatre-details/useFetchTheatreDetails.ts";
import TheatreScreensPageSection from "@/pages/theatres/components/sections/TheatreScreensPageSection.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import {EntityPaginatedQuery} from "@/common/type/repositories/EntityRequestParamTypes.ts";

const TheatrePage: FC = () => {
    const {theatreID} = useFetchTheatreParams();
    const pagination = {screen: {paginated: true, page: 1, perPage: 6} as EntityPaginatedQuery};

    const theatreDetails = useFetchTheatreDetails({theatreID: theatreID!, pagination});
    const {data, isPending, isError, queryError, parseSuccess, parseError} = theatreDetails;

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!parseSuccess) return <PageParseError error={parseError} />;

    const {theatre, screens: paginatedScreens, showings: paginatedShowings} = data;

    const {items: screens} = paginatedScreens!;
    const {items: showings} = paginatedShowings!;

    return (
        <PageFlexWrapper>
            <TheatreDetailsHeader theatre={theatre}/>

            {/* Details */}

            <TheatreDetailsCard theatre={theatre}/>

            {/* Screens */}

            <TheatreScreensPageSection screens={screens} theatreID={theatre._id}/>

            {/* Showings */}

            <PageSection title="Showings">
                {/* TODO Paginated Showings */}
                {showings.length}
            </PageSection>
        </PageFlexWrapper>
    );
};

export default TheatrePage;
