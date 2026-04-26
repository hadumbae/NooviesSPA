/**
 * @fileoverview Tab navigation and content orchestration for the Theatre Screen details page.
 */

import {ReactElement, useState} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import {
    TheatreScreenDetailsViewSeatsTab
} from "@/views/admin/theatres/theatre-screen-details-page/tabs/TheatreScreenDetailsViewSeatsTab.tsx";
import {TheatreScreenDetailsCreateSeatTab}
    from "@/views/admin/theatres/theatre-screen-details-page/tabs/TheatreScreenDetailsCreateSeatTab.tsx";
import {TheatreScreenDetailsShowingsTab}
    from "@/views/admin/theatres/theatre-screen-details-page/tabs/TheatreScreenDetailsShowingsTab.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Seat} from "@/domains/seats/schema/seat/Seat.types.ts";
import {
    TheatreScreenDetailsActiveTab
} from "@/domains/theatre-screens/schema/search-params/TheatreScreenDetailsActiveTabEnumSchema.ts";
import {SeatDetailsPanelContextProvider} from "@/domains/seats/context/seat-details-context";
import {SeatFormData} from "@/domains/seats/_feat/submit-data";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {
    TheatreScreenDetailsSearchParamSchema
} from "@/domains/theatre-screens/schema/search-params/TheatreScreenDetailsSearchParamSchema.ts";
import {SeatSubmitForm} from "@/views/admin/seats/_feat/submit-data";
import {SeatDetails} from "@/domains/seats/schema/seat/SeatDetails.types.ts";

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
    const [returnedSeating, setReturnedSeating] = useState<SeatDetails[]>([]);
    const {searchParams, setSearchParams} = useParsedSearchParams({schema: TheatreScreenDetailsSearchParamSchema});
    const {activeTab} = searchParams;

    const presetValues: Partial<SeatFormData> = {
        screen: screenID,
        theatre: theatreID
    };

    const onSeatCreation = (seat: SeatDetails) => {
        setReturnedSeating((prev: SeatDetails[]) => [...prev, seat]);
    }

    return (
        <Tabs
            defaultValue={activeTab}
            onValueChange={(v) => setSearchParams({
                ...searchParams,
                activeTab: v as TheatreScreenDetailsActiveTab
            })}
        >
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

            <SeatSubmitForm presetValues={presetValues} onSubmitSuccess={onSeatCreation}>
                <TheatreScreenDetailsCreateSeatTab
                    returnedSeating={returnedSeating}
                    setReturnedSeating={setReturnedSeating}
                />
            </SeatSubmitForm>

            <TheatreScreenDetailsShowingsTab screenID={screenID}/>
        </Tabs>
    );
}