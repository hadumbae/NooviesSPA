import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreScreenDetailsBreadcrumbs
    from "@/pages/screens/components/theatre-screen/admin/breadcrumbs/TheatreScreenDetailsBreadcrumbs.tsx";
import useFetchTheatreScreenParams from "@/pages/theatres/hooks/params/useFetchTheatreScreenParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import TheatreScreenDetailsHeader
    from "@/pages/screens/components/theatre-screen/admin/headers/TheatreScreenDetailsHeader.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import TheatreScreenSeatsByRowCard
    from "@/pages/screens/components/theatre-screen/admin/lists/TheatreScreenSeatsByRowCard.tsx";
import useTheatreScreenSearchParams from "@/pages/screens/hooks/screens-by-theatres/params/useTheatreScreenSearchParams.ts";
import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import useFetchScreen from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreen.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {ScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";

/**
 * Page component displaying detailed information for a specific theatre screen.
 *
 * Includes:
 * - Breadcrumb navigation for the theatre and screen
 * - Header with screen details and action buttons
 * - Tabs for viewing seats and showings
 * - Seats tab renders `TheatreScreenSeatsByRowCard` for seat management
 * - Showings tab displays pagination info for screen showings
 *
 * Fetches theatre and screen data using `useFetchTheatre` and `useFetchScreen` hooks,
 * and validates them with Zod schemas via `CombinedValidatedQueryBoundary`.
 *
 * @component
 * @returns A JSX element rendering the full screen details page.
 */
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
                    const {theatre, screen} = data as { theatre: TheatreDetails; screen: ScreenDetails };

                    return (
                        <PageFlexWrapper>
                            <section className="space-y-1">
                                <TheatreScreenDetailsBreadcrumbs
                                    theatreID={theatreID}
                                    theatreName={theatre.name}
                                    screenName={screen.name}
                                />

                                <TheatreScreenDetailsHeader
                                    theatre={theatre}
                                    screen={screen}
                                />
                            </section>

                            <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v)}>
                                <section className="flex justify-center">
                                    <TabsList>
                                        <TabsTrigger value="seats">Seats</TabsTrigger>
                                        <TabsTrigger value="showings">Showings</TabsTrigger>
                                    </TabsList>
                                </section>

                                <TabsContent value="seats">
                                    <TheatreScreenSeatsByRowCard theatreID={theatreID} screenID={screenID}/>
                                </TabsContent>

                                <TabsContent value="showings">
                                    <p>Showings</p>
                                    <p>Page : {showingPage}</p>
                                    <p>Per Page : {showingsPerPage}</p>
                                </TabsContent>
                            </Tabs>
                        </PageFlexWrapper>
                    );
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
};

export default ScreenDetailsPage;
