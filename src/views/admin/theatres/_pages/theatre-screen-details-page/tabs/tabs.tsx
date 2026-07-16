/**
 * @fileoverview Tab navigation and content orchestration for the Theatre Screen details page.
 */

import {ReactElement, useState} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/common/components/ui";
import {ObjectId} from "@/common/_schemas";
import {
    TheatreScreenDetailsViewSeatsTab
} from "@/views/admin/theatres/_pages/theatre-screen-details-page/tabs/TheatreScreenDetailsViewSeatsTab.tsx";
import {
    TheatreScreenDetailsShowingsTab
} from "@/views/admin/theatres/_pages/theatre-screen-details-page/tabs/TheatreScreenDetailsShowingsTab.tsx";
import {
    TheatreScreenDetailsActiveTab,
    TheatreScreenDetailsSearchParamSchema
} from "@/domains/theatre-screens/_feat/page-search-params";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {SeatDetails} from "@/domains/seats/_schema/model";

/** Props for the TheatreScreenDetailsPageTabs component. */
type TabsProps = {
    theatreID: ObjectId;
    screenID: ObjectId;
    seats: SeatDetails[];
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
                    <TabsTrigger value="seating">Seats</TabsTrigger>
                    <TabsTrigger value="showings">Showings</TabsTrigger>
                </TabsList>
            </div>

            <TheatreScreenDetailsViewSeatsTab
                screenID={screenID}
                theatreID={theatreID}
                seating={seats}
                returnedSeating={returnedSeating}
                setReturnedSeating={setReturnedSeating}
            />

            <TheatreScreenDetailsShowingsTab
                screenID={screenID}
            />
        </Tabs>
    );
}