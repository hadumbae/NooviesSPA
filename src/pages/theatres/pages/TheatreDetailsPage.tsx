import {FC} from 'react';
import useFetchTheatreDetailsParams from "@/pages/theatres/hooks/theatre-details/useFetchTheatreDetailsParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreDetailsHeader from "@/pages/theatres/components/headers/TheatreDetailsHeader.tsx";
import TheatreDetailsCard from "@/pages/theatres/components/TheatreDetailsCard.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import useFetchTheatreDetails from "@/pages/theatres/hooks/queries/details/theatre-details/useFetchTheatreDetails.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import {EntityPaginatedQuery} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import TheatreDetailsBreadcrumbs from "@/pages/theatres/components/breadcrumbs/admin/TheatreDetailsBreadcrumbs.tsx";
import useTheatreDetailsSearchParams
    from "@/pages/theatres/hooks/theatre-details/search-params/useTheatreDetailsSearchParams.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import TheatreScreensOverviewTab
    from "@/pages/screens/components/theatre-screen/admin/tabs/TheatreScreensOverviewTab.tsx";

const TheatreDetailsPage: FC = () => {
    const urlParams = useFetchTheatreDetailsParams();
    if (!urlParams) return <PageLoader/>

    const {theatreID} = urlParams;
    const params = useTheatreDetailsSearchParams();
    const pagination = {screen: {paginated: true, page: 1, perPage: 6} as EntityPaginatedQuery};

    const theatreDetails = useFetchTheatreDetails({theatreID: theatreID!, pagination});
    const {data, isPending, isError, queryError, parseSuccess, parseError} = theatreDetails;

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!parseSuccess) return <PageParseError error={parseError}/>;

    const {searchParams, setScreenPage} = params
    const {activeTab, screenPage, screenPerPage} = searchParams;

    const {theatre} = data;

    return (
        <PageFlexWrapper>
            <TheatreDetailsBreadcrumbs theatreName={theatre.name}/>
            <TheatreDetailsHeader theatre={theatre}/>

            <PageSection srTitle="Theatre Details Card">
                <TheatreDetailsCard theatre={theatre}/>
            </PageSection>

            <Tabs defaultValue={activeTab ?? "screens"} className="h-full">
                <section className="flex justify-center">
                    <TabsList>
                        <TabsTrigger value="screens">Screens</TabsTrigger>
                        <TabsTrigger value="showings">Showings</TabsTrigger>
                    </TabsList>
                </section>

                <TabsContent value="screens" className="h-full py-5">
                    <TheatreScreensOverviewTab
                        theatreID={theatreID}
                        page={screenPage}
                        perPage={screenPerPage}
                        setPage={setScreenPage}
                    />
                </TabsContent>

                <TabsContent value="showings">
                    Showings
                </TabsContent>
            </Tabs>

        </PageFlexWrapper>
    );
};

export default TheatreDetailsPage;
