/**
 * @file TheatreDetailsPageTabs.tsx
 * @summary
 * Tabbed interface for managing Theatre Details in the admin panel.
 *
 * @description
 * This component renders a tabbed UI for navigating between:
 * - **Screens**: paginated list of screens belonging to the theatre
 * - **Showings**: placeholder section for scheduled showtimes
 *
 * URL search parameters are used (via {@link useParsedSearchParams}) to:
 * - Track the active tab
 * - Persist pagination state (`screenPage`, `screenPerPage`)
 * - Allow shareable and reload-persistent URLs
 *
 * The Screens tab is wrapped in {@link ScreenFormContextProvider} to provide
 * default form values and control disabled fields for screen creation/editing.
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs.tsx";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import { TheatreDetailsSearchParamSchema } from "@/pages/theatres/schema/params/TheatreDetailsSearchParamSchema.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import TheatreDetailsScreensTab from "@/pages/theatres/pages/theatre-details-page/tabs/TheatreDetailsScreensTab.tsx";
import ScreenFormContextProvider from "@/pages/screens/contexts/screen-form/ScreenFormContextProvider.tsx";
import { ScreenFormValues } from "@/pages/screens/schema/forms/ScreenForm.types.ts";

/**
 * Props for {@link TheatreDetailsPageTabs}.
 */
export type TabProps = {
    /**
     * Unique identifier of the theatre for which the tabs are rendered.
     */
    theatreID: ObjectId;
};

/**
 * Renders a tabbed UI for the Theatre Details page.
 *
 * Tabs include:
 * - **Screens Tab**: displays a paginated list of screens with context support for screen forms
 * - **Showings Tab**: placeholder for future showings management
 *
 * Active tab and pagination state are stored in URL search parameters,
 * enabling deep linking and page reload persistence.
 *
 * @param props - Component props (see {@link TabProps})
 * @returns A fully rendered tabbed interface for theatre administration.
 *
 * @example
 * ```tsx
 * <TheatreDetailsPageTabs theatreID="65af01c9e4f12d98b73b2dd1" />
 * ```
 */
const TheatreDetailsPageTabs = (props: TabProps) => {
    const { theatreID } = props;

    // --- Search Params ---
    const { searchParams, setSearchParams } = useParsedSearchParams({ schema: TheatreDetailsSearchParamSchema });
    const { activeTab = "screens", screenPage = 1, screenPerPage = 10 } = searchParams;

    const setActivePage = (tab: "screens" | "showings") => setSearchParams({ ...searchParams, activeTab: tab });
    const setScreenPage = (page: number) => setSearchParams({ ...searchParams, screenPage: page });

    // --- Screen Form Defaults ---
    const presetValues = { theatre: theatreID };
    const disableFields: (keyof ScreenFormValues)[] = ["theatre"];

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
            <ScreenFormContextProvider presetValues={presetValues} disableFields={disableFields}>
                <TabsContent value="screens" className="h-full py-5">
                    <TheatreDetailsScreensTab
                        theatreID={theatreID}
                        page={screenPage}
                        perPage={screenPerPage}
                        setPage={setScreenPage}
                        classNames={{ container: "h-full" }}
                        queries={{ sortByName: "asc" }}
                    />
                </TabsContent>
            </ScreenFormContextProvider>

            {/* Showings Tab */}
            <TabsContent value="showings" className="h-full py-5">
                Showings
            </TabsContent>
        </Tabs>
    );
};

export default TheatreDetailsPageTabs;
