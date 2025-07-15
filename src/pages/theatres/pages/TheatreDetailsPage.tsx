import {FC} from 'react';
import useFetchTheatreDetailsParams from "@/pages/theatres/hooks/theatre-details/useFetchTheatreDetailsParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreDetailsHeader from "@/pages/theatres/components/headers/TheatreDetailsHeader.tsx";
import TheatreDetailsCard from "@/pages/theatres/components/TheatreDetailsCard.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import TheatreDetailsBreadcrumbs from "@/pages/theatres/components/breadcrumbs/admin/TheatreDetailsBreadcrumbs.tsx";
import useTheatreDetailsSearchParams
    from "@/pages/theatres/hooks/theatre-details/search-params/useTheatreDetailsSearchParams.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import TheatreScreensOverviewTab
    from "@/pages/screens/components/theatre-screen/admin/tabs/TheatreScreensOverviewTab.tsx";
import {useNavigate} from "react-router-dom";
import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";

const TheatreDetailsPage: FC = () => {
    const urlParams = useFetchTheatreDetailsParams();
    if (!urlParams) return <PageLoader/>

    const navigate = useNavigate();
    const {theatreID} = urlParams;
    const params = useTheatreDetailsSearchParams();

    const {data, isPending, isError, error: queryError} = useFetchTheatre({
        _id: theatreID,
        populate: true,
        virtuals: true,
    });

    const {data: theatre, success, error: parseError} = useValidateData({
        data,
        isPending,
        schema: TheatreDetailsSchema,
        message: "Invalid theatre data.",
    });

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!success) return <PageParseError error={parseError}/>;

    const {searchParams, setScreenPage} = params
    const {activeTab, screenPage, screenPerPage} = searchParams;

    const onDelete = () => navigate("/admin/theatres");

    return (
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

                <TabsContent value="showings">
                    Showings
                </TabsContent>
            </Tabs>

        </PageFlexWrapper>
    );
};

export default TheatreDetailsPage;
