/**
 * @file TheatreScreenCreateSeatTab.tsx
 * @summary
 * Renders a tab within the screen administration interface that allows staff
 * to create seats for a specific theatre screen.
 *
 * @remarks
 * This component:
 * - Pre-fills `theatre` and `screen` values for seat creation.
 * - Disables these fields to prevent accidental reassignment.
 * - Displays a live, session-only list of seats that have been submitted.
 *
 * It requires being wrapped in a `SeatFormContext.Provider`. This is enforced
 * at runtime by `useRequiredContext`, which throws a descriptive error if the
 * component is used outside the provider.
 *
 * @see SeatSubmitFormContainer
 * @see SeatFormSubmitList
 * @see SeatFormContext
 */

import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import SeatSubmitFormContainer from "@/pages/seats/components/forms/submit-form/SeatSubmitFormContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import SeatFormSubmitList from "@/pages/screens/components/theatre-screens/admin/features/seat-submit/SeatFormSubmitList.tsx";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatFormContext} from "@/pages/seats/context/form/SeatFormContext.ts";
import {TabsContent} from "@/common/components/ui/tabs.tsx";
import {ReactElement} from "react";

/**
 * Props for the {@link ScreenDetailsCreateSeatTab} component.
 */
export type TabProps = {
    /**
     * The ID of the screen for which seats are being created.
     */
    screenID: ObjectId;

    /**
     * The ID of the theatre that the screen belongs to.
     */
    theatreID: ObjectId;
};

/**
 * @component ScreenDetailsCreateSeatTab
 * @description
 * Renders the "Create Seats" tab for a theatre screen. This tab provides:
 *
 * - A seat creation form with pre-filled and disabled `theatre` and `screen` fields.
 * - Automatic integration with `SeatFormContext` to read the list of seats
 *   created during the current session.
 * - A dynamically updating visual list of submitted seats.
 *
 * @param props - The IDs of the target theatre and screen.
 * @returns A `TabsContent` element containing the seat creation interface.
 *
 * @example
 * ```tsx
 * <ScreenDetailsCreateSeatTab
 *   screenID={screen._id}
 *   theatreID={theatre._id}
 * />
 * ```
 */
const ScreenDetailsCreateSeatTab = (props: TabProps): ReactElement => {
    const {screenID, theatreID} = props;

    // Must be inside SeatFormContext provider
    const {returnedSeats} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    const presetValues: Partial<SeatForm> = {
        screen: screenID,
        theatre: theatreID,
    };

    const disableFields: (keyof SeatFormValues)[] = ["theatre", "screen"];

    return (
        <TabsContent value="create-seats" className="space-y-4">
            {/* Seat creation form */}
            <section className="space-y-2">
                <SectionHeader>Create Seats</SectionHeader>
                <Card>
                    <CardContent className="p-4">
                        <SeatSubmitFormContainer
                            presetValues={presetValues}
                            disableFields={disableFields}
                        />
                    </CardContent>
                </Card>
            </section>

            {/* Submitted seat list */}
            {returnedSeats.length > 0 && (
                <section className="space-y-2">
                    <SectionHeader>Seats</SectionHeader>
                    <SeatFormSubmitList />
                </section>
            )}
        </TabsContent>
    );
};

export default ScreenDetailsCreateSeatTab;
