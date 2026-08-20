/**
 * @fileoverview Renders a form section component for creating and listing newly created seats for a theatre screen.
 */

import {ReactElement, useState} from "react";
import {PageSectionHeader} from "@/views/common/_comp";
import {Card, CardContent, Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/views/common/_comp/ui";
import {SeatFormSubmitList, SeatSubmitForm, SeatSubmitFormActions, SeatSubmitFormView} from "@/views/admin/seats";
import {SeatDetails, SeatFormData, SeatFormValues} from "@/domains/seats";
import {HideFields} from "@/common/_types";
import {ObjectId} from "@/common/_schemas";
import {ChevronDown, ChevronUp} from "lucide-react";

/** Props for the TheatreScreenDetailsFormSection component. */
type SectionProps = {
    screenID: ObjectId;
    theatreID: ObjectId;
};

/**
 * Renders the form and list for adding new seats to a specific theatre screen.
 */
export function TheatreScreenDetailsFormSection(
    {screenID, theatreID}: SectionProps
): ReactElement {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [returnedSeating, setReturnedSeating] = useState<SeatDetails[]>([]);

    const presetValues: Partial<SeatFormData> = {screen: screenID, theatre: theatreID};
    const hideFields: HideFields<SeatFormValues> = {screen: true, theatre: true};
    const onSeatCreation = (seat: SeatDetails) => setReturnedSeating((prev: SeatDetails[]) => [...prev, seat]);

    return (
        <section className="space-y-4">
            <PageSectionHeader as="h2" text="Create Seats"/>

            <Collapsible open={isCreating} onOpenChange={setIsCreating}>
                <CollapsibleTrigger
                    className="primary-text rounded-container-border p-3 flex items-center space-x-2"
                >
                    <span>{isCreating ? "Close" : "Open"} Form</span>
                    {isCreating ? <ChevronUp/> : <ChevronDown/>}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                    <Card>
                        <SeatSubmitForm presetValues={presetValues} onSubmitSuccess={onSeatCreation}>
                            <CardContent className="p-4 space-y-4">
                                <SeatSubmitFormView hideFields={hideFields}/>
                                <SeatSubmitFormActions/>
                            </CardContent>
                        </SeatSubmitForm>
                    </Card>

                    {returnedSeating.length > 0 && (
                        <section className="space-y-2">
                            <PageSectionHeader as="h2" text="Seats"/>

                            <SeatFormSubmitList
                                returnedSeating={returnedSeating}
                                setReturnedSeating={setReturnedSeating}
                            />
                        </section>
                    )}
                </CollapsibleContent>
            </Collapsible>


        </section>
    );
}