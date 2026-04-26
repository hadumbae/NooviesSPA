/**
 * @fileoverview Administrative tab for creating seats and viewing a session-based list of submitted seat data.
 */

import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {TabsContent} from "@/common/components/ui/tabs.tsx";
import {Dispatch, ReactElement, SetStateAction} from "react";
import {SeatFormValues} from "@/domains/seats/_feat/submit-data";
import {SeatSubmitFormView} from "@/views/admin/seats/_feat/submit-data";
import {SeatDetails} from "@/domains/seats/schema/seat/SeatDetails.types.ts";
import {SeatFormSubmitList} from "@/views/admin/seats/_comp/returned-seat-list";

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
    const disableFields: Partial<Record<keyof SeatFormValues, boolean>> = {
        screen: true,
        theatre: true,
    };

    return (
        <TabsContent value="create-seats" className="space-y-4">
            <section className="space-y-2">
                <SectionHeader>Create Seats</SectionHeader>
                <Card>
                    <CardContent className="p-4">
                        <SeatSubmitFormView disableFields={disableFields}/>
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