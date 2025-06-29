import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreScreenDetailsBreadcrumbs
    from "@/pages/screens/components/theatre-screens/admin/breadcrumbs/TheatreScreenDetailsBreadcrumbs.tsx";
import useFetchTheatreScreenParams from "@/pages/theatres/hooks/params/useFetchTheatreScreenParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useTheatreScreenDetailQueries
    from "@/pages/theatres/hooks/queries/screens/theatre-screen-details/useTheatreScreenDetailQueries.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import TheatreScreenDetailsHeader
    from "@/pages/screens/components/theatre-screens/admin/headers/TheatreScreenDetailsHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import useTheatreScreenSearchParams from "@/pages/screens/hooks/theatre-screens/params/useTheatreScreenSearchParams.ts";
import useValidateTheatreScreenDetails
    from "@/pages/theatres/hooks/queries/screens/theatre-screen-details/useValidateTheatreScreenDetails.ts";

const TheatreScreenPage: FC = () => {
    const urlParams = useFetchTheatreScreenParams();
    if (!urlParams) return <PageLoader/>;

    const {theatreID, screenID} = urlParams;
    const {searchParams} = useTheatreScreenSearchParams();
    const {activeTab, ...paginationOptions} = searchParams;

    const {queries, isPending, isError, error: queryError} = useTheatreScreenDetailQueries({
        theatreID,
        screenID,
        paginationOptions
    });

    const {data, success, error: parseError} = useValidateTheatreScreenDetails({isPending, queries});

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!success) return <PageParseError error={parseError}/>;

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
