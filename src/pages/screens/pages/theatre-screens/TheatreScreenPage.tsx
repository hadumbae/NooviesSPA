import {FC, useEffect} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreScreenDetailsBreadcrumbs
    from "@/pages/screens/components/theatre-screens/admin/breadcrumbs/TheatreScreenDetailsBreadcrumbs.tsx";
import useFetchTheatreScreenParams from "@/pages/theatres/hooks/params/useFetchTheatreScreenParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchTheatreAndScreen from "@/pages/theatres/hooks/queries/screens/useFetchTheatreAndScreen.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import TheatreScreenDetailsHeader
    from "@/pages/screens/components/theatre-screens/admin/headers/TheatreScreenDetailsHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import useTheatreScreenSearchParams from "@/pages/screens/hooks/theatre-screens/params/useTheatreScreenSearchParams.ts";

const TheatreScreenPage: FC = () => {
    const urlParams = useFetchTheatreScreenParams();
    if (!urlParams) return <PageLoader />;

    const {theatreID, screenID} = urlParams;
    const {data, isPending, isError, queryError, parseSuccess, parseError} = useFetchTheatreAndScreen({theatreID, screenID});

    if (isPending) return <PageLoader />;
    if (isError) return  <PageHTTPError error={queryError} />;
    if (!parseSuccess) return <PageParseError error={parseError} />;

    const {theatre, screen} = data;

    return (
        <PageFlexWrapper>
            <TheatreScreenDetailsBreadcrumbs
                theatreID={theatre._id}
                theatreName={theatre.name}
                screenName={screen.name}
            />

            <TheatreScreenDetailsHeader
                theatre={theatre}
                screen={screen}
            />

            <PageSection title="Seating" srTitle="Screen Seats">

            </PageSection>
        </PageFlexWrapper>
    );
};

export default TheatreScreenPage;
