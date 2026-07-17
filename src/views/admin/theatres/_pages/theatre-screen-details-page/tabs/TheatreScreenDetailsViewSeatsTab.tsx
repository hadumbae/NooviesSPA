/**
 * @fileoverview Tab content for rendering and managing a theatre screen's interactive seat layout.
 */

import {Dispatch, ReactElement, SetStateAction} from "react";
import {EmptyArrayContainer} from "@/common/components/text/EmptyArrayContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {SeatFormSubmitList} from "@/views/admin/seats/_comp/returned-seat-list";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {DisableFields} from "@/common/_types";
import {ScrollArea, ScrollBar, TabsContent} from "@/common/components/ui";

import {SeatDetails, SeatFormData, SeatFormValues, SeatPanelContextProvider} from "@/domains/seats";
import {SeatContextPanel} from "@/views/admin/seats/_feat/context-action-panel";
import {ScreenSeatLayout} from "@/views/admin/seats/_comp/screen-seats/ScreenSeatLayout.tsx";
import {SeatSubmitForm, SeatSubmitFormActions, SeatSubmitFormView} from "@/views/admin/seats/_feat/submit-data";

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
    const presetValues: Partial<SeatFormData> = {screen: screenID, theatre: theatreID};
    const disableFields: DisableFields<SeatFormValues> = {screen: true, theatre: true};
    const onSeatCreation = (seat: SeatDetails) => setReturnedSeating((prev: SeatDetails[]) => [...prev, seat]);

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
                <PageSectionHeader as="h2" text="Create Seats"/>

                <Card>
                    <SeatSubmitForm presetValues={presetValues} onSubmitSuccess={onSeatCreation}>
                        <CardContent className="p-4 space-y-4">
                            <SeatSubmitFormView disableFields={disableFields}/>
                            <SeatSubmitFormActions/>
                        </CardContent>
                    </SeatSubmitForm>
                </Card>
            </section>

            {returnedSeating.length > 0 && (
                <section className="space-y-2">
                    <PageSectionHeader as="h2" text="Seats"/>
                    <SeatFormSubmitList returnedSeating={returnedSeating} setReturnedSeating={setReturnedSeating}/>
                </section>
            )}
        </TabsContent>
    );
}