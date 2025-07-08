import {FC} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import useTheatreScreenSearchParams from "@/pages/screens/hooks/theatre-screens/params/useTheatreScreenSearchParams.ts";
import TheatreScreenPageSeatsTabContent
    from "@/pages/screens/components/theatre-screen/admin/tabs/TheatreScreenPageSeatsTabContent.tsx";
import TheatreScreenPageShowingsTab
    from "@/pages/screens/components/theatre-screen/admin/tabs/TheatreScreenPageShowingsTab.tsx";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

type PageTabsProps = {
    theatreID: ObjectId;
    screenID: ObjectId;
}

const TheatreScreenPageTabs: FC<PageTabsProps> = ({theatreID, screenID}) => {
    const {searchParams, setActiveTab} = useTheatreScreenSearchParams({activeTab: "seats"});
    const {activeTab, showingPage, showingsPerPage} = searchParams;

    return (
        <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v)}>
            <section className="flex justify-center">
                <TabsList>
                    <TabsTrigger value="seats">Seats</TabsTrigger>
                    <TabsTrigger value="showings">Showings</TabsTrigger>
                </TabsList>
            </section>

            <TabsContent value="seats">
                <TheatreScreenPageSeatsTabContent
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
    );
};

export default TheatreScreenPageTabs;
