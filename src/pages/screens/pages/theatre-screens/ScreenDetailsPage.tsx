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
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import ScreenSeatsByRowCard
    from "@/pages/screens/components/theatre-screen/admin/tabs/ScreenSeatsByRowCard.tsx";
import TheatreScreenPageShowingsTab
    from "@/pages/screens/components/theatre-screen/admin/tabs/TheatreScreenPageShowingsTab.tsx";
import useTheatreScreenSearchParams from "@/pages/screens/hooks/theatre-screens/params/useTheatreScreenSearchParams.ts";

const ScreenDetailsPage: FC = () => {
    const urlParams = useFetchTheatreScreenParams();
    if (!urlParams) return <PageLoader/>;

    const {theatreID, screenID} = urlParams;
    const {searchParams, setActiveTab} = useTheatreScreenSearchParams({activeTab: "seats"});

    const {queries, isPending, isError, error: queryError} = useTheatreScreenDetailQueries({theatreID, screenID});
    const {data, success, error: parseError} = useValidateTheatreScreenDetails({isPending, queries});

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!success) return <PageParseError error={parseError}/>;

    const {activeTab, showingPage, showingsPerPage} = searchParams;
    const {theatre, screen} = data;

    return (
        <PageFlexWrapper>
            <TheatreScreenDetailsBreadcrumbs
                theatreID={theatreID}
                theatreName={theatre.name}
                screenName={screen.name}
            />

            <TheatreScreenDetailsHeader
                theatre={theatre}
                screen={screen}
            />

            <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v)}>
                <section className="flex justify-center">
                    <TabsList>
                        <TabsTrigger value="seats">Seats</TabsTrigger>
                        <TabsTrigger value="showings">Showings</TabsTrigger>
                    </TabsList>
                </section>

                <TabsContent value="seats">
                    <ScreenSeatsByRowCard
                        theatreID={theatreID}
                        screenID={screenID}
                    />
                </TabsContent>

                <TheatreScreenPageShowingsTab
                    tabValue="showings"
                    page={showingPage}
                    perPage={showingsPerPage}
                />
            </Tabs>
        </PageFlexWrapper>
    );
};

export default ScreenDetailsPage;
