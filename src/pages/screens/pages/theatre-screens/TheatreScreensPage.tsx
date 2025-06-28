import {FC} from 'react';

import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";

import TheatreScreensIndexHeader from "@/pages/screens/components/theatre-screens/admin/headers/TheatreScreensIndexHeader.tsx";

import useFetchTheatreParams from "@/pages/theatres/hooks/params/useFetchTheatreParams.ts";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import useFetchTheatreAndScreens
    from "@/pages/theatres/hooks/queries/screens/theatre-and-screens/useFetchTheatreAndScreens.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import TheatreScreensIndexBreadcrumbs
    from "@/pages/screens/components/theatre-screens/admin/breadcrumbs/TheatreScreensIndexBreadcrumbs.tsx";
import TheatreScreenCard from "@/pages/theatres/components/screens/TheatreScreenCard.tsx";

const TheatreScreensPage: FC = () => {
    const urlParams = useFetchTheatreParams();
    if (!urlParams) return <PageLoader />;

    const {theatreID} = urlParams;
    const {page, perPage} = usePaginationSearchParams({perPage: "10"});

    const {data, isPending, isError, queryError, parseError, parseSuccess} = useFetchTheatreAndScreens({
        theatreID,
        screenOptions: {page, perPage},
    });

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!parseSuccess) return <PageParseError error={parseError}/>;

    const {theatre, screens: paginatedScreens} = data;

    const {_id, name: theatreName} = theatre;
    const {items: screens} = paginatedScreens;

    const hasScreens = screens.length > 0;

    return (
        <PageFlexWrapper>
            <TheatreScreensIndexBreadcrumbs theatreID={_id} theatreName={theatreName}/>
            <TheatreScreensIndexHeader theatre={theatre!}/>

            {
                hasScreens
                    ? <PageSection className="grid grid-cols-1 gap-3">
                        {screens.map((screen) => <TheatreScreenCard key={screen._id} screen={screen}/>)}
                    </PageSection>
                    : <PageCenter>
                        <span className="text-neutral-400 select-none">There Are No Screens</span>
                    </PageCenter>
            }

        </PageFlexWrapper>
    );
};

export default TheatreScreensPage;
