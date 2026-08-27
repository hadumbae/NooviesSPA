/**
 * @fileoverview Layout section for displaying and updating internal administrative notes on a customer reservation.
 */

import {ReactElement, useState} from "react";
import {EmptyArrayContainer, PageSectionHeader} from "@/views/common/_comp";
import {
    ReservationNotesText,
    UpdateReservationNotesForm,
    UpdateReservationNotesFormPopup
} from "@/views/admin/reservations";
import {Button} from "@/views/common/_comp/ui";
import {Pencil} from "lucide-react";
import {ObjectId} from "@/common/_schemas";

/** Props for the AdminReservationNotesSection component. */
type SectionProps = {
    reservationID: ObjectId;
    notes?: string | null;
};

/**
 * Renders the admin notes section, including the current text details and an interactive update form modal.
 */
export function AdminReservationNotesSection(
    {reservationID, notes}: SectionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const closeOnSuccess = () => setIsOpen(false);

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <PageSectionHeader text="Admin Notes"/>

                <UpdateReservationNotesForm
                    mutConfig={{reservationID}}
                    presetValues={{notes: notes ?? ""}}
                    onSubmitSuccess={closeOnSuccess}
                >
                    <UpdateReservationNotesFormPopup isOpen={isOpen} setIsOpen={setIsOpen}>
                        <Button size="fab" variant="ghostRing">
                            <Pencil/>
                        </Button>
                    </UpdateReservationNotesFormPopup>
                </UpdateReservationNotesForm>
            </div>

            {
                notes
                    ? <ReservationNotesText text={notes}/>
                    : <EmptyArrayContainer className="min-h-28 rounded-container-border" text="There Are No Notes"/>
            }
        </section>
    );
}