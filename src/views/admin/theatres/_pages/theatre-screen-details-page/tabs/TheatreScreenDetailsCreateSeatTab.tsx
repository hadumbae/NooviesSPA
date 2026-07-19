/**
 * @fileoverview Administrative tab for creating seats and viewing a session-based list of submitted seat data.
 */

import {Dispatch, ReactElement, SetStateAction} from "react";
import {Card, CardContent, TabsContent} from "@/views/common/_comp/ui";
import {SectionTitle} from "@/views/common/_comp";
import {SeatDetails} from "@/domains/seats";
import {SeatSubmitFormView} from "@/views/admin/seats/_feat";
import {SeatFormSubmitList} from "@/views/admin/seats/_comp";

/** Props for the TheatreScreenDetailsCreateSeatTab component. */
type TabProps = {
    returnedSeating: SeatDetails[];
    setReturnedSeating: Dispatch<SetStateAction<SeatDetails[]>>
}

/**
 * Renders the seat creation interface and a list of seats added during the current user session.
 */
export function TheatreScreenDetailsCreateSeatTab(
    {returnedSeating, setReturnedSeating}: TabProps,
): ReactElement {
    return (
        <TabsContent value="create-seats" className="space-y-4">
            <section className="space-y-2">
                <SectionTitle>Create Seats</SectionTitle>
                <Card>
                    <CardContent className="p-4">
                        <SeatSubmitFormView disableFields={{screen: true, theatre: true}}/>
                    </CardContent>
                </Card>
            </section>

            {returnedSeating.length > 0 && (
                <section className="space-y-2">
                    <SectionTitle>Seats</SectionTitle>
                    <SeatFormSubmitList
                        returnedSeating={returnedSeating}
                        setReturnedSeating={setReturnedSeating}
                    />
                </section>
            )}
        </TabsContent>
    );
}