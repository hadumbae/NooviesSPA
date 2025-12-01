/**
 * @file TheatreScreenCreateSeatTab.tsx
 *
 * @summary
 * A tab component for creating seats associated with a specific theatre screen.
 * It provides a form for adding new seats and displays a live list of seats that
 * have been added in the current session.
 *
 * @description
 * This component integrates:
 * - `SeatSubmitFormContainer` for creating new seats with pre-filled theatre and screen.
 * - `SeatFormSubmitList` to display seats that were created during the session.
 *
 * It manages seat state locally with `useState` and updates the list when a seat
 * is successfully submitted.
 *
 * Fields `theatre` and `screen` are disabled in the form to prevent accidental changes.
 */

import {FC, useState} from 'react';
import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import SeatSubmitFormContainer from "@/pages/seats/components/forms/submit-form/SeatSubmitFormContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import SeatFormSubmitList
    from "@/pages/screens/components/theatre-screens/admin/features/seat-submit/SeatFormSubmitList.tsx";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";

/**
 * Props for {@link TheatreScreenCreateSeatTab}.
 *
 * @property screenID - The ID of the screen for which seats are being created.
 * @property theatreID - The ID of the theatre to which the screen belongs.
 */
type TabProps = {
    /** The ID of the screen associated with this seat tab. */
    screenID: ObjectId;

    /** The ID of the theatre associated with the screen. */
    theatreID: ObjectId;
};

/**
 * @component TheatreScreenCreateSeatTab
 *
 * @description
 * Provides a seat creation workflow for a specific theatre screen. Users can:
 * - Fill out the seat creation form (with theatre and screen pre-filled)
 * - Submit new seats
 * - View a live list of seats created in the current session
 * - Remove seats from the list if necessary
 *
 * @param props - See {@link TabProps}.
 * @returns A React element rendering the seat creation tab.
 *
 * @example
 * ```tsx
 * <TheatreScreenCreateSeatTab screenID={screen._id} theatreID={theatre._id} />
 * ```
 */
const TheatreScreenCreateSeatTab: FC<TabProps> = (props) => {
    const {screenID, theatreID} = props;

    // ⚡ State ⚡

    const [seats, setSeats] = useState<Seat[]>([]);

    // ⚡ Form Options ⚡

    const presetValues: Partial<SeatForm> = {screen: screenID, theatre: theatreID};
    const disableFields: (keyof SeatFormValues)[] = ["theatre", "screen"];

    // ⚡ Handlers ⚡

    /**
     * Handles successful submission of a seat form.
     * Adds the new seat to the local seat list.
     *
     * @param seat - The seat object returned from a successful form submission.
     */
    const onSubmitSuccess = (seat: Seat) => {
        setSeats([...seats, seat]);
    };

    return (
        <div className="space-y-4">
            {/* ⚡ Create Seats ⚡ */}

            <section className="space-y-2">
                <SectionHeader>Create Seats</SectionHeader>

                <Card>
                    <CardContent className="p-4">
                        <SeatSubmitFormContainer
                            presetValues={presetValues}
                            disableFields={disableFields}
                            onSubmitSuccess={onSubmitSuccess}
                        />
                    </CardContent>
                </Card>
            </section>

            {/* ⚡ Seats ⚡ */}

            {
                seats.length > 0 &&
                <section className="space-y-2">
                    <SectionHeader>Seats</SectionHeader>
                    <SeatFormSubmitList seats={seats} setSeats={setSeats}/>
                </section>
            }
        </div>
    );
};

export default TheatreScreenCreateSeatTab;
