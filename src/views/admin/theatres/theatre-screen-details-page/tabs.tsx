/**
 * @fileoverview Tab navigation and content orchestration for the Theatre Screen details page.
 */

import {ReactElement} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import SeatDetailsPanelContextProvider
    from "@/domains/seats/context/seat-details-context/SeatDetailsPanelContextProvider.tsx";
import {
    TheatreScreenDetailsViewSeatsTab
} from "@/views/admin/theatres/theatre-screen-details-page/tabs/TheatreScreenDetailsViewSeatsTab.tsx";
import SeatFormContextProvider from "@/domains/seats/context/form/SeatFormContextProvider.tsx";
import TheatreScreenDetailsCreateSeatTab
    from "@/views/admin/theatres/theatre-screen-details-page/tabs/TheatreScreenDetailsCreateSeatTab.tsx";
import TheatreScreenDetailsShowingsTab
    from "@/views/admin/theatres/theatre-screen-details-page/tabs/TheatreScreenDetailsShowingsTab.tsx";
import useScreenDetailsPageValues
    from "@/domains/theatre-screens/hooks/page/screen-details/useScreenDetailsPageValues.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Seat} from "@/domains/seats/schema/seat/Seat.types.ts";
import {
    TheatreScreenDetailsActiveTab
} from "@/domains/theatre-screens/schema/search-params/TheatreScreenDetailsActiveTabEnumSchema.ts";

/** Props for the TheatreScreenDetailsPageTabs component. */
type TabsProps = {
    theatreID: ObjectId;
    screenID: ObjectId;
    seats: Seat[];
};

/**
 * Manages the layout and context providers for screen-specific tabs, including seats and showings.
 */
export function TheatreScreenDetailsPageTabs(
    {theatreID, screenID, seats}: TabsProps
): ReactElement {
    const {presetValues, disableFields, tabConfig: {activeTab, setActiveTab}} = useScreenDetailsPageValues({
        theatreID,
        screenID
    });

    return (
        <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v as TheatreScreenDetailsActiveTab)}>
            <div className="flex justify-center">
                <TabsList>
                    <TabsTrigger value="view-seats">Seats</TabsTrigger>
                    <TabsTrigger value="create-seats">Create Seats</TabsTrigger>
                    <TabsTrigger value="showings">Showings</TabsTrigger>
                </TabsList>
            </div>

            <SeatDetailsPanelContextProvider>
                <TheatreScreenDetailsViewSeatsTab seats={seats}/>
            </SeatDetailsPanelContextProvider>

            <SeatFormContextProvider presetValues={presetValues} disableFields={disableFields}>
                <TheatreScreenDetailsCreateSeatTab/>
            </SeatFormContextProvider>

            <TheatreScreenDetailsShowingsTab screenID={screenID}/>
        </Tabs>
    );
}