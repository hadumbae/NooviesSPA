import {FC} from 'react';
import useFetchTheatreDetailsParams from "@/pages/theatres/hooks/theatre-details/useFetchTheatreDetailsParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreDetailsHeader from "@/pages/theatres/components/headers/TheatreDetailsHeader.tsx";
import TheatreDetailsCard from "@/pages/theatres/components/TheatreDetailsCard.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import TheatreDetailsBreadcrumbs from "@/pages/theatres/components/breadcrumbs/admin/TheatreDetailsBreadcrumbs.tsx";
import useTheatreDetailsSearchParams
    from "@/pages/theatres/hooks/theatre-details/search-params/useTheatreDetailsSearchParams.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import TheatreScreensOverviewTab
    from "@/pages/screens/components/theatre-screen/admin/tabs/TheatreScreensOverviewTab.tsx";
import {useNavigate} from "react-router-dom";
import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

const TheatreDetailsPage: FC = () => {
    const {theatreID} = useFetchTheatreDetailsParams() ?? {};
    if (!theatreID) return <PageLoader/>;

    const query = useFetchTheatre({_id: theatreID, populate: true, virtuals: true});

    const {searchParams: {activeTab, screenPage, screenPerPage}, setScreenPage} = useTheatreDetailsSearchParams();

    const navigate = useNavigate();
    const onDelete = () => navigate("/admin/theatres");

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={TheatreDetailsSchema} message={"Invalid theatre data."}>
                {(theatre: TheatreDetails) => (
                    <PageFlexWrapper>
                        <TheatreDetailsBreadcrumbs theatreName={theatre.name}/>
                        <TheatreDetailsHeader theatre={theatre} onDelete={onDelete}/>

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

                            <TabsContent value="showings">Showings</TabsContent>
                        </Tabs>

                    </PageFlexWrapper>
                )}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreDetailsPage;
