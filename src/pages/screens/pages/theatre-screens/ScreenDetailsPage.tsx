import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreScreenDetailsBreadcrumbs
    from "@/pages/screens/components/theatre-screen/admin/breadcrumbs/TheatreScreenDetailsBreadcrumbs.tsx";
import useFetchTheatreScreenParams from "@/pages/theatres/hooks/params/useFetchTheatreScreenParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import TheatreScreenDetailsHeader
    from "@/pages/screens/components/theatre-screen/admin/headers/TheatreScreenDetailsHeader.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import ScreenSeatsByRowCard
    from "@/pages/screens/components/theatre-screen/admin/tabs/ScreenSeatsByRowCard.tsx";
import TheatreScreenPageShowingsTab
    from "@/pages/screens/components/theatre-screen/admin/tabs/TheatreScreenPageShowingsTab.tsx";
import useTheatreScreenSearchParams from "@/pages/screens/hooks/theatre-screens/params/useTheatreScreenSearchParams.ts";
import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import useFetchScreen from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreen.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {ScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";

const ScreenDetailsPage: FC = () => {
    const urlParams = useFetchTheatreScreenParams();
    if (!urlParams) return <PageLoader/>;
    const {theatreID, screenID} = urlParams;

    const {searchParams, setActiveTab} = useTheatreScreenSearchParams({activeTab: "seats"});
    const {activeTab, showingPage, showingsPerPage} = searchParams;

    const theatreQuery = useFetchTheatre<TheatreDetails>({_id: theatreID, virtuals: true, populate: true});
    const screenQuery = useFetchScreen<ScreenDetails>({_id: screenID, virtuals: true, populate: true});

    const validationQueries: CombinedSchemaQuery[] = [
        {key: "theatre", query: theatreQuery, schema: TheatreDetailsSchema},
        {key: "screen", query: screenQuery, schema: ScreenDetailsSchema},
    ];

    return (
        <CombinedQueryBoundary queries={[theatreQuery, screenQuery]}>
            <CombinedValidatedQueryBoundary queries={validationQueries}>
                {(data) => {
                    const {theatre, screen} = data as {theatre: TheatreDetails, screen: ScreenDetails};

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
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
};

export default ScreenDetailsPage;
