/**
 * @file TheatreDetailsPageTabs.tsx
 *
 * @summary
 * Tabbed admin interface for managing theatre details.
 */

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {TheatreDetailsSearchParamSchema} from "@/pages/theatres/schema/params/TheatreDetailsSearchParamSchema.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import TheatreDetailsScreensTab from "@/pages/theatres/pages/theatre-details-page/tabs/TheatreDetailsScreensTab.tsx";
import ScreenFormContextProvider from "@/pages/screens/contexts/screen-form/ScreenFormContextProvider.tsx";
import {ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import TheatreDetailsShowingsTab
    from "@/pages/theatres/pages/theatre-details-page/tabs/TheatreDetailsShowingsTab.tsx";

/**
 * Props for {@link TheatreDetailsPageTabs}.
 */
export type TabProps = {
    /** Theatre identifier used for scoping tab content */
    theatreID: ObjectId;
};

/**
 * Renders tabbed content for the theatre details admin page.
 *
 * Tabs:
 * - **Screens**: paginated screen management with form context
 * - **Showings**: recent scheduled showings for the theatre
 *
 * Active tab and pagination state are persisted via URL search params.
 *
 * @param props - Component props
 * @returns Theatre details tab interface
 */
const TheatreDetailsPageTabs = ({theatreID}: TabProps) => {
    // --- Search Params ---
    const {searchParams, setSearchParams} = useParsedSearchParams({
        schema: TheatreDetailsSearchParamSchema,
    });

    const {
        activeTab = "screens",
        screenPage = 1,
        screenPerPage = 25,
    } = searchParams;

    // --- Search Param Setters ---
    const setActivePage = (tab: "screens" | "showings") =>
        setSearchParams({...searchParams, activeTab: tab});

    const setScreenPage = (page: number) =>
        setSearchParams({...searchParams, screenPage: page});

    // --- Screen Form Defaults ---
    const presetValues = {theatre: theatreID};
    const disableFields: (keyof ScreenFormValues)[] = ["theatre"];

    return (
        <Tabs className="h-full" defaultValue={activeTab}>
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

            <ScreenFormContextProvider
                presetValues={presetValues}
                disableFields={disableFields}
            >
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
            </ScreenFormContextProvider>

            <TabsContent value="showings">
                <TheatreDetailsShowingsTab
                    theatreID={theatreID}
                    className="h-full space-y-4"
                />
            </TabsContent>
        </Tabs>
    );
};

export default TheatreDetailsPageTabs;
