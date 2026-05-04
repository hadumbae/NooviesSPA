/**
 * @fileoverview Tab content for rendering and managing a theatre screen's interactive seat layout.
 */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import ScreenSeatLayout from "@/domains/seats/components/features/screen-seats/ScreenSeatLayout.tsx";
import {ReactElement} from "react";
import {cn} from "@/common/lib/utils.ts";
import {CardCSS} from "@/common/constants/css/ContainerCSS.ts";
import {SeatContextPanel} from "@/views/admin/seats/_feat/context-action-panel";
import {SeatDetails} from "@/domains/seats/schema/model";
import {SeatPanelContextProvider} from "@/domains/seats/_feat/seat-details-context";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

/** Props for the TheatreScreenDetailsViewSeatsTab component. */
type TabProps = {
    seats: SeatDetails[];
};

/**
 * Renders the seat grid layout and provides access to the seat details sidebar.
 */
export function TheatreScreenDetailsViewSeatsTab(
    {seats}: TabProps
): ReactElement {
    return (
        <TabsContent value="view-seats">
            <SeatPanelContextProvider>
                {
                    seats.length > 0 ? (
                        <section className="space-y-2">
                            <SectionHeader>Seat Layout</SectionHeader>

                            <ScrollArea className={cn(CardCSS, "w-full p-3")}>
                                <ScreenSeatLayout seats={seats}/>
                                <ScrollBar orientation="horizontal"/>
                            </ScrollArea>
                        </section>
                    ) : (
                        <EmptyArrayContainer
                            className="rounded-container-border h-56"
                            text="There Are No Seats"
                        />
                    )
                }

                <SeatContextPanel/>
            </SeatPanelContextProvider>
        </TabsContent>
    );
}