/**
 * @fileoverview Tab content for rendering and managing a theatre screen's interactive seat layout.
 */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import ScreenSeatLayout from "@/domains/seats/components/features/screen-seats/ScreenSeatLayout.tsx";
import {Dispatch, ReactElement, SetStateAction} from "react";
import {SeatDetails} from "@/domains/seats/schema/model";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {
    SeatFormDisableFields,
    SeatSubmitForm,
    SeatSubmitFormButtons,
    SeatSubmitFormView
} from "@/views/admin/seats/_feat/submit-data";
import {SeatFormSubmitList} from "@/views/admin/seats/_comp/returned-seat-list";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {SeatFormData} from "@/domains/seats/_feat/submit-data";
import {SeatPanelContextProvider} from "@/domains/seats/_feat/seat-details-context";
import {SeatContextPanel} from "@/views/admin/seats/_feat/context-action-panel";

/** Props for the TheatreScreenDetailsViewSeatsTab component. */
type TabProps = {
    screenID: string;
    theatreID: string;
    seating: SeatDetails[];
    returnedSeating: SeatDetails[];
    setReturnedSeating: Dispatch<SetStateAction<SeatDetails[]>>;
};

/**
 * Renders the seat grid layout and provides access to the seat details sidebar.
 */
export function TheatreScreenDetailsViewSeatsTab(
    {screenID, theatreID, seating, returnedSeating, setReturnedSeating}: TabProps
): ReactElement {
    const presetValues: Partial<SeatFormData> = {
        screen: screenID,
        theatre: theatreID
    };

    const disableFields: SeatFormDisableFields = {
        screen: true,
        theatre: true,
    };

    const onSeatCreation = (seat: SeatDetails) => {
        setReturnedSeating((prev: SeatDetails[]) => [...prev, seat]);
    }

    return (
        <TabsContent value="seating" className="space-y-4">
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

            <section className="space-y-4">
                <PageSectionHeader>Create Seats</PageSectionHeader>
                <Card>
                    <CardContent className="p-4 space-y-4">
                        <SeatSubmitForm presetValues={presetValues} onSubmitSuccess={onSeatCreation}>
                            <SeatSubmitFormView disableFields={disableFields}/>
                            <SeatSubmitFormButtons/>
                        </SeatSubmitForm>

                    </CardContent>
                </Card>
            </section>

            {returnedSeating.length > 0 && (
                <section className="space-y-2">
                    <SectionHeader>Seats</SectionHeader>
                    <SeatFormSubmitList
                        returnedSeating={returnedSeating}
                        setReturnedSeating={setReturnedSeating}
                    />
                </section>
            )}
        </TabsContent>
    );
}