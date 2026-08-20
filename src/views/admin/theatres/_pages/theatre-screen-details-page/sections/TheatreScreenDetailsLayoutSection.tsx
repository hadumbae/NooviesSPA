/**
 * @fileoverview Renders the seat layout display section for theatre screen details.
 */

import {ReactElement} from "react";
import {SeatDetails, SeatPanelContextProvider} from "@/domains/seats";
import {ScreenSeatLayout, SeatContextPanel} from "@/views/admin/seats";
import {EmptyArrayContainer, PageSectionHeader} from "@/views/common/_comp";
import {Card, CardContent, ScrollArea, ScrollBar} from "@/views/common/_comp/ui";

/** Props for the TheatreScreenDetailsLayoutSection component. */
type SectionProps = {
    seating: SeatDetails[];
};

/**
 * Renders the seating layout grid and contextual seat panel wrapped in the seat panel context provider.
 */
export function TheatreScreenDetailsLayoutSection(
    {seating}: SectionProps
): ReactElement {
    return (
        <SeatPanelContextProvider>
            <section className="space-y-4">
                <PageSectionHeader>Seat Layout</PageSectionHeader>

                <ScrollArea>
                    {
                        seating.length > 0 ? (
                            <Card>
                                <CardContent className="p-4">
                                    <ScreenSeatLayout seating={seating}/>
                                </CardContent>
                            </Card>
                        ) : (
                            <EmptyArrayContainer
                                className="rounded-container-border h-56"
                                text="There Are No Seats"
                            />
                        )
                    }

                    <ScrollBar orientation="horizontal"/>
                    <SeatContextPanel/>
                </ScrollArea>
            </section>
        </SeatPanelContextProvider>
    );
}