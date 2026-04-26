/**
 * @fileoverview Tab content for rendering and managing a theatre screen's interactive seat layout.
 */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import ScreenSeatLayout from "@/domains/seats/components/features/screen-seats/ScreenSeatLayout.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatDetailsPanelContext} from "@/domains/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import {ReactElement} from "react";
import {cn} from "@/common/lib/utils.ts";
import {CardCSS, RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {Seat} from "@/domains/seats/schema/seat/Seat.types.ts";
import {SeatSubmitForm} from "@/views/admin/seats/_feat/submit-data";
import {SeatDetailsContextPanel} from "@/views/admin/seats/_feat/context-action-panel";

/** Props for the TheatreScreenDetailsViewSeatsTab component. */
type TabProps = {
    seats: Seat[];
};

/**
 * Renders the seat grid layout and provides access to the seat details sidebar.
 */
export function TheatreScreenDetailsViewSeatsTab(
    {seats}: TabProps
): ReactElement {
    const {seat} = useRequiredContext({context: SeatDetailsPanelContext});

    const contentSection = seats.length > 0 ? (
        <section className="space-y-2">
            <SectionHeader>Seat Layout</SectionHeader>

            <ScrollArea className={cn(CardCSS, "w-full p-3")}>
                <ScreenSeatLayout seats={seats}/>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </section>
    ) : (
        <section className={RoundedBorderCSS}>
            <div className="flex justify-center items-center h-56">
                <span className={cn(SecondaryTextBaseCSS, "select-none capitalize")}>
                    There Are No Seats
                </span>
            </div>
        </section>
    );

    return (
        <TabsContent value="view-seats">
            {contentSection}

            {
                seat && <SeatSubmitForm editEntity={seat}>
                    <SeatDetailsContextPanel/>
                </SeatSubmitForm>
            }
        </TabsContent>
    );
}