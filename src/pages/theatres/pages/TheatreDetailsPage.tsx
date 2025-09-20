import { FC } from 'react';
import useFetchTheatreDetailsParams from "@/pages/theatres/hooks/theatre-details/useFetchTheatreDetailsParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreDetailsHeader from "@/pages/theatres/components/headers/TheatreDetailsHeader.tsx";
import TheatreDetailsCard from "@/pages/theatres/components/TheatreDetailsCard.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import TheatreDetailsBreadcrumbs from "@/pages/theatres/components/breadcrumbs/admin/TheatreDetailsBreadcrumbs.tsx";
import useTheatreDetailsSearchParams
    from "@/pages/theatres/hooks/theatre-details/search-params/useTheatreDetailsSearchParams.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs.tsx";
import TheatreScreensOverviewTab
    from "@/pages/screens/components/theatre-screen/admin/tabs/TheatreScreensOverviewTab.tsx";
import { useNavigate } from "react-router-dom";
import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import { TheatreDetailsSchema } from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import { TheatreDetails } from "@/pages/theatres/schema/theatre/Theatre.types.ts";

/**
 * Page component displaying detailed information for a single theatre.
 *
 * Features:
 * - Breadcrumbs and header with actions (e.g., delete theatre)
 * - Theatre details card
 * - Tabs for managing associated screens and showings
 * - Fetches theatre data and validates it against `TheatreDetailsSchema`
 * - Handles loading and invalid data states gracefully
 *
 * @remarks
 * - Uses `useFetchTheatreDetailsParams` to extract `theatreID` from URL or context
 * - Uses `QueryBoundary` and `ValidatedQueryBoundary` to handle async fetching and schema validation
 * - Includes `TheatreScreensOverviewTab` with pagination and sorting for screens
 *
 * @example
 * ```tsx
 * <TheatreDetailsPage />
 * ```
 */
const TheatreDetailsPage: FC = () => {
    const { theatreID } = useFetchTheatreDetailsParams() ?? {};

    // Show loader if no theatre ID
    if (!theatreID) return <PageLoader />;

    // Fetch theatre data with virtuals and populated relations
    const query = useFetchTheatre({ _id: theatreID, populate: true, virtuals: true });

    const {
        searchParams: { activeTab, screenPage, screenPerPage },
        setScreenPage
    } = useTheatreDetailsSearchParams();

    const navigate = useNavigate();
    const onDelete = () => navigate("/admin/theatres");

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={TheatreDetailsSchema} message={"Invalid theatre data."}>
                {(theatre: TheatreDetails) => {
                    const theatreTabs = (
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
                                    className={{ container: "h-full" }}
                                    queries={{ sortByName: "asc" }}
                                />
                            </TabsContent>

                            <TabsContent value="showings" className="h-full py-5">
                                Showings
                            </TabsContent>
                        </Tabs>
                    );

                    return (
                        <PageFlexWrapper>
                            <TheatreDetailsBreadcrumbs theatreName={theatre.name} />
                            <TheatreDetailsHeader theatre={theatre} onDelete={onDelete} />

                            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                                <PageSection srTitle="Theatre Details Card">
                                    <TheatreDetailsCard theatre={theatre} />
                                </PageSection>

                                <PageSection className="h-full">
                                    {theatreTabs}
                                </PageSection>
                            </section>
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreDetailsPage;
