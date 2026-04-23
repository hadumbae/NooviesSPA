/**
 * @fileoverview Tabbed administrative interface for managing a theatre's screens and scheduled showings.
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs.tsx";
import { useParsedSearchParams } from "@/common/features/fetch-search-params";
import { TheatreDetailsSearchParamSchema } from "@/domains/theatres/schema/params/TheatreDetailsSearchParamSchema.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { TheatreDetailsScreensTab } from "@/views/admin/theatres/theatre-details-page/tabs/TheatreDetailsScreensTab.tsx";
import ScreenFormContextProvider from "@/domains/theatre-screens/contexts/screen-form/ScreenFormContextProvider.tsx";
import { TheatreDetailsShowingsTab }
    from "@/views/admin/theatres/theatre-details-page/tabs/TheatreDetailsShowingsTab.tsx";
import { TheatreScreenFormValues } from "@/domains/theatre-screens/forms";
import { ReactElement } from "react";

/** Props for the TheatreDetailsPageTabs component. */
export type TabProps = {
    theatreID: ObjectId;
};

/**
 * Orchestrates the tabbed views for theatre sub-resources.
 * State for the active tab and pagination is synchronized with URL search parameters.
 */
export function TheatreDetailsPageTabs(
    { theatreID }: TabProps
): ReactElement {
    const { searchParams, setSearchParams } = useParsedSearchParams({
        schema: TheatreDetailsSearchParamSchema,
    });

    const {
        activeTab = "screens",
        screenPage = 1,
        screenPerPage = 25,
    } = searchParams;

    /** Updates the active tab parameter in the URL. */
    const setActiveTab = (tab: "screens" | "showings") =>
        setSearchParams({ ...searchParams, activeTab: tab });

    /** Updates the screen pagination page parameter in the URL. */
    const setScreenPage = (page: number) =>
        setSearchParams({ ...searchParams, screenPage: page });

    /** Default configuration for the screen creation/edit forms within this theatre's context. */
    const presetValues = { theatre: theatreID };
    const disableFields: (keyof TheatreScreenFormValues)[] = ["theatre"];

    return (
        <Tabs className="h-full" defaultValue={activeTab}>
            <div className="flex justify-center">
                <TabsList>
                    <TabsTrigger value="screens" onClick={() => setActiveTab("screens")}>
                        Screens
                    </TabsTrigger>
                    <TabsTrigger value="showings" onClick={() => setActiveTab("showings")}>
                        Showings
                    </TabsTrigger>
                </TabsList>
            </div>

            {/* Screen Management Tab */}
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
                        classNames={{ container: "h-full" }}
                        queries={{ sortByName: "asc" }}
                    />
                </TabsContent>
            </ScreenFormContextProvider>

            {/* Showings Management Tab */}
            <TabsContent value="showings">
                <TheatreDetailsShowingsTab
                    theatreID={theatreID}
                    className="h-full space-y-4"
                />
            </TabsContent>
        </Tabs>
    );
}