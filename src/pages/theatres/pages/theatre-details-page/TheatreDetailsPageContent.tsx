import {FC} from 'react';
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import TheatreDetailsScreenTab
    from "@/pages/screens/components/theatre-screen/admin/tabs/TheatreDetailsScreenTab.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreDetailsBreadcrumbs from "@/pages/theatres/components/breadcrumbs/admin/TheatreDetailsBreadcrumbs.tsx";
import TheatreDetailsHeader from "@/pages/theatres/components/headers/TheatreDetailsHeader.tsx";
import TheatreDetailsCard from "@/pages/theatres/components/TheatreDetailsCard.tsx";
import TheatreSubmitFormPanel from "@/pages/theatres/components/theatre-submit-form/TheatreSubmitFormPanel.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Pencil, Trash} from "lucide-react";
import TheatreDeleteWarningDialog
    from "@/pages/theatres/components/theatres/delete-theatre/TheatreDeleteWarningDialog.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {TheatreDetailsSearchParamSchema} from "@/pages/theatres/schema/params/TheatreDetailsSearchParamSchema.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

type TheatreDetailsPageContentProps = {
    theatre: TheatreDetails;
}

const TheatreDetailsPageContent: FC<TheatreDetailsPageContentProps> = ({theatre}) => {
    // ⚡ State ⚡

    const {_id} = theatre;

    // ⚡ Search Params ⚡

    const {searchParams, setSearchParams} = useParsedSearchParams({schema: TheatreDetailsSearchParamSchema});
    const {activeTab = "screens", screenPage = 1, screenPerPage = 10} = searchParams;

    const setActivePage = (tab: "screens" | "showings") => setSearchParams({...searchParams, activeTab: tab});
    const setScreenPage = (page: number) => setSearchParams({...searchParams, screenPage: page});

    // ⚡ Handlers ⚡

    const navigate = useLoggedNavigate();

    const navigateOnDelete = () => {
        navigate({
            level: "log",
            to: "/admin/theatres",
            component: TheatreDetailsPageContent.name,
            message: "Navigating after deleting theatre.",
        });
    }

    // ⚡ Tabs ⚡

    const theatreTabs = (
        <Tabs className="h-full" defaultValue={activeTab}>
            <section className="flex justify-center">
                <TabsList>
                    <TabsTrigger value="screens" onClick={() => setActivePage("screens")}>Screens</TabsTrigger>
                    <TabsTrigger value="showings" onClick={() => setActivePage("showings")}>Showings</TabsTrigger>
                </TabsList>
            </section>

            <TabsContent value="screens" className="h-full py-5">
                <TheatreDetailsScreenTab
                    theatreID={_id}
                    page={screenPage}
                    perPage={screenPerPage}
                    setPage={setScreenPage}
                    className={{container: "h-full"}}
                    queries={{sortByName: "asc"}}
                />
            </TabsContent>

            <TabsContent value="showings" className="h-full py-5">
                Showings
            </TabsContent>
        </Tabs>
    );

    // ⚡ Hidden Sections ⚡

    const hiddenEditingSection = (
        <section className="hidden">
            <TheatreSubmitFormPanel isEditing={true} entity={theatre}>
                <Button variant="link" className="text-neutral-400 hover:text-black">
                    <Pencil/> Edit
                </Button>
            </TheatreSubmitFormPanel>
        </section>
    );

    const hiddenDeleteSection = (
        <section className="hidden">
            <TheatreDeleteWarningDialog theatreID={theatre._id} onDeleteSuccess={navigateOnDelete}>
                <Button variant="link" className="text-neutral-400 hover:text-black">
                    <Trash/> Delete
                </Button>
            </TheatreDeleteWarningDialog>
        </section>
    );

    return (
        <PageFlexWrapper>
            <TheatreDetailsBreadcrumbs theatreName={theatre.name}/>
            <TheatreDetailsHeader theatre={theatre} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                <section>
                    <SectionHeader srOnly={true}>Theatre Details Card</SectionHeader>
                    <TheatreDetailsCard theatre={theatre}/>
                </section>

                <section className="h-full">
                    <SectionHeader srOnly={true}>Theatre Screens And Movie Showings</SectionHeader>
                    {theatreTabs}
                </section>
            </div>

            {hiddenEditingSection}
            {hiddenDeleteSection}
        </PageFlexWrapper>
    );
};

export default TheatreDetailsPageContent;
