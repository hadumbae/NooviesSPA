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
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {TheatreDetailsUIContext} from "@/pages/theatres/context/TheatreDetailsUIContext.ts";

/**
 * Props for {@link TheatreDetailsPageContent}.
 */
type TheatreDetailsPageContentProps = {
    /** Theatre entity containing all details required to render the page */
    theatre: TheatreDetails;
}

/**
 * **TheatreDetailsPageContent**
 *
 * Main content component for the theatre details page in the admin interface.
 *
 * ### Features:
 * - Displays theatre breadcrumbs, header, and main details card.
 * - Renders tabs for "Screens" and "Showings" with paginated screen data.
 * - Supports hidden edit and delete panels that open via context state.
 * - Uses search parameters to track active tab and pagination state.
 * - Integrates with {@link TheatreDetailsUIContext} for UI state control.
 *
 * @param props - Props including the theatre entity to render.
 *
 * @example
 * ```tsx
 * <TheatreDetailsPageContent theatre={theatre} />
 * ```
 */
const TheatreDetailsPageContent: FC<TheatreDetailsPageContentProps> = ({theatre}) => {
    // ⚡ State ⚡
    const {_id} = theatre;

    // ⚡ Search Params ⚡
    const {searchParams, setSearchParams} = useParsedSearchParams({schema: TheatreDetailsSearchParamSchema});
    const {activeTab = "screens", screenPage = 1, screenPerPage = 10} = searchParams;

    const setActivePage = (tab: "screens" | "showings") => setSearchParams({...searchParams, activeTab: tab});
    const setScreenPage = (page: number) => setSearchParams({...searchParams, screenPage: page});

    // ⚡ Context ⚡
    const {
        isEditing,
        setIsEditing,
        isDeleting,
        setIsDeleting,
    } = useRequiredContext({context: TheatreDetailsUIContext});

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

    // ⚡ Hidden Panels ⚡
    const hiddenEditingSection = (
        <section className="hidden">
            <TheatreSubmitFormPanel
                isEditing={true}
                entity={theatre}
                presetOpen={isEditing}
                setPresetOpen={setIsEditing}
            >
                <Button variant="link" className="text-neutral-400 hover:text-black">
                    <Pencil/> Edit
                </Button>
            </TheatreSubmitFormPanel>
        </section>
    );

    const hiddenDeleteSection = (
        <section className="hidden">
            <TheatreDeleteWarningDialog
                theatreID={theatre._id}
                onDeleteSuccess={navigateOnDelete}
                presetOpen={isDeleting}
                setPresetOpen={setIsDeleting}
            >
                <Button variant="link" className="text-neutral-400 hover:text-black">
                    <Trash/> Delete
                </Button>
            </TheatreDeleteWarningDialog>
        </section>
    );

    return (
        <PageFlexWrapper>
            <TheatreDetailsBreadcrumbs theatreName={theatre.name}/>
            <TheatreDetailsHeader theatre={theatre}/>

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

            {isEditing && hiddenEditingSection}
            {isDeleting && hiddenDeleteSection}
        </PageFlexWrapper>
    );
};

export default TheatreDetailsPageContent;
