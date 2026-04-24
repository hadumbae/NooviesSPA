/**
 * @fileoverview Tabbed administrative interface for managing a theatre's screens and scheduled showings.
 */

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {TheatreDetailsSearchParamSchema} from "@/domains/theatres/schema/params/TheatreDetailsSearchParamSchema.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {TheatreDetailsScreensTab} from "@/views/admin/theatres/theatre-details-page/tabs/TheatreDetailsScreensTab.tsx";
import ScreenFormContextProvider from "@/domains/theatre-screens/contexts/screen-form/ScreenFormContextProvider.tsx";
import {TheatreDetailsShowingsTab}
    from "@/views/admin/theatres/theatre-details-page/tabs/TheatreDetailsShowingsTab.tsx";
import {TheatreScreenFormValues} from "@/domains/theatre-screens/forms";
import {ReactElement} from "react";
import {PaginatedItems} from "@/common/types";
import {TheatreScreenWithVirtuals} from "@/domains/theatre-screens/schema/model";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/** Props for the TheatreDetailsPageTabs component. */
export type TabProps = {
    theatreID: ObjectId;
    theatreSlug: SlugString;
    screens: PaginatedItems<TheatreScreenWithVirtuals>;
    showings: ShowingDetails[];
    screenPage: number;
    screenPerPage: number;
    setScreenPage: (page: number) => void;
};

/**
 * Orchestrates the tabbed views for theatre sub-resources.
 */
export function TheatreDetailsPageTabs(
    {theatreID, theatreSlug, screens, screenPage, screenPerPage, setScreenPage}: TabProps
): ReactElement {
    const {searchParams, setSearchParams} = useParsedSearchParams({schema: TheatreDetailsSearchParamSchema});
    const {activeTab = "screens"} = searchParams;
    const setActiveTab = (tab: "screens" | "showings") => setSearchParams({...searchParams, activeTab: tab});

    const presetValues = {theatre: theatreID};
    const disableFields: (keyof TheatreScreenFormValues)[] = ["theatre"];

    return (
        <Tabs className="h-full" defaultValue={activeTab}>
            <div className="flex justify-center">
                <TabsList>
                    <TabsTrigger value="screens" onClick={() => setActiveTab("screens")}>Screens</TabsTrigger>
                    <TabsTrigger value="showings" onClick={() => setActiveTab("showings")}>Showings</TabsTrigger>
                </TabsList>
            </div>

            <ScreenFormContextProvider presetValues={presetValues} disableFields={disableFields}>
                <TheatreDetailsScreensTab
                    theatreSlug={theatreSlug}
                    screens={screens.items}
                    totalScreens={screens.totalItems}
                    page={screenPage}
                    perPage={screenPerPage}
                    setPage={setScreenPage}
                />
            </ScreenFormContextProvider>

            <TabsContent value="showings">
                <TheatreDetailsShowingsTab
                    theatreID={theatreID}
                    className="h-full space-y-4"
                />
            </TabsContent>
        </Tabs>
    );
}