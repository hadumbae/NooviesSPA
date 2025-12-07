/**
 * @file TheatreDetailsPageTabs.tsx
 * @description
 * Tabbed interface for the Theatre Details admin page.
 *
 * Provides navigation between:
 * - **Screens**: paginated screen list
 * - **Showings**: placeholder for scheduled showtimes
 *
 * The component uses URL search parameters (via `useParsedSearchParams`)
 * to persist active tab and pagination state across reloads and deep links.
 */

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {TheatreDetailsSearchParamSchema} from "@/pages/theatres/schema/params/TheatreDetailsSearchParamSchema.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import TheatreDetailsScreensTab from "@/pages/theatres/pages/theatre-details-page/tabs/TheatreDetailsScreensTab.tsx";

/**
 * Props for {@link TheatreDetailsPageTabs}.
 */
export type TabProps = {
    /**
     * Unique identifier of the theatre whose tabs are rendered.
     */
    theatreID: ObjectId;
};

/**
 * Renders the tabbed UI for the Theatre Details page.
 *
 * Includes:
 * - **Screens Tab**: paginated list of theatre screens
 * - **Showings Tab**: future placeholder
 *
 * The active tab and pagination state are managed via search params,
 * enabling shareable URLs and reload persistence.
 *
 * @param props - Component props (see {@link TabProps})
 *
 * @example
 * ```tsx
 * <TheatreDetailsPageTabs theatreID="65af01c9e4f12d98b73b2dd1" />
 * ```
 */
const TheatreDetailsPageTabs = (props: TabProps) => {
    // ⚡ State ⚡
    const {theatreID} = props;

    // ⚡ Search Params ⚡
    const {searchParams, setSearchParams} = useParsedSearchParams({schema: TheatreDetailsSearchParamSchema});
    const {activeTab = "screens", screenPage = 1, screenPerPage = 10} = searchParams;

    const setActivePage = (tab: "screens" | "showings") =>
        setSearchParams({...searchParams, activeTab: tab});

    const setScreenPage = (page: number) =>
        setSearchParams({...searchParams, screenPage: page});

    // ⚡ Render Tabs ⚡

    return (
        <Tabs className="h-full" defaultValue={activeTab}>
            {/* Tab Selector */}
            <div className="flex justify-center">
                <TabsList>
                    <TabsTrigger value="screens" onClick={() => setActivePage("screens")}>
                        Screens
                    </TabsTrigger>
                    <TabsTrigger value="showings" onClick={() => setActivePage("showings")}>
                        Showings
                    </TabsTrigger>
                </TabsList>
            </div>

            {/* Screens Tab */}
            <TabsContent value="screens" className="h-full py-5">
                <TheatreDetailsScreensTab
                    theatreID={theatreID}
                    page={screenPage}
                    perPage={screenPerPage}
                    setPage={setScreenPage}
                    classNames={{container: "h-full"}}
                    queries={{sortByName: "asc"}}
                />
            </TabsContent>

            {/* Showings Tab */}
            <TabsContent value="showings" className="h-full py-5">
                Showings
            </TabsContent>
        </Tabs>
    );
};

export default TheatreDetailsPageTabs;
