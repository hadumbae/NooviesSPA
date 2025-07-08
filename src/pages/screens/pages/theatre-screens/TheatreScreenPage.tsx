import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreScreenDetailsBreadcrumbs
    from "@/pages/screens/components/theatre-screen/admin/breadcrumbs/TheatreScreenDetailsBreadcrumbs.tsx";
import useFetchTheatreScreenParams from "@/pages/theatres/hooks/params/useFetchTheatreScreenParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useTheatreScreenDetailQueries
    from "@/pages/theatres/hooks/queries/screens/theatre-screen-details/useTheatreScreenDetailQueries.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import TheatreScreenDetailsHeader
    from "@/pages/screens/components/theatre-screen/admin/headers/TheatreScreenDetailsHeader.tsx";
import useValidateTheatreScreenDetails
    from "@/pages/theatres/hooks/queries/screens/theatre-screen-details/useValidateTheatreScreenDetails.ts";
import TheatreScreenPageTabs from "@/pages/screens/components/theatre-screen/admin/tabs/TheatreScreenPageTabs.tsx";

const TheatreScreenPage: FC = () => {
    const urlParams = useFetchTheatreScreenParams();
    if (!urlParams) return <PageLoader/>;

    const {theatreID, screenID} = urlParams;
    const {queries, isPending, isError, error: queryError} = useTheatreScreenDetailQueries({theatreID, screenID});
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

            <TheatreScreenPageTabs
                theatreID={theatre._id}
                screenID={screen._id}
            />
        </PageFlexWrapper>
    );
};

export default TheatreScreenPage;
