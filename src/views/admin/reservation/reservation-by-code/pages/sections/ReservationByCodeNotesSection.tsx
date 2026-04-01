/**
 * @file UI section for displaying and managing administrative reservation notes.
 * @filename ReservationByCodeNotesSection.tsx
 */

import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ReservationNotesText} from "@/views/admin/reservation/components/ReservationNotesText.tsx";
import {PageSectionHeader} from "@/common/components/page/PageSectionHeader.tsx";
import {
    UpdateReservationNotesForm
} from "@/views/admin/reservation/update-reservation-notes/components/update-notes-form/UpdateReservationNotesForm.tsx";
import {
    UpdateReservationNotesFormPopup
} from "@/views/admin/reservation/update-reservation-notes/components/update-notes-form/UpdateReservationNotesFormPopup.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Pencil} from "lucide-react";
import {useState} from "react";

/**
 * Properties for the {@link ReservationByCodeNotesSection} component.
 */
type SectionProps = {
    /** The MongoDB ObjectId of the reservation, used for identifying the update target. */
    resID: ObjectId
    /** The existing note content to display. If undefined, an empty state is shown. */
    notes?: string | null;
};

/**
 * A layout section that displays persistent admin notes and provides a trigger for editing.
 */
export const ReservationByCodeNotesSection = (
    {resID, notes}: SectionProps
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const closeOnSuccess = () => setIsOpen(false);

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <PageSectionHeader text="Admin Notes"/>

                <UpdateReservationNotesForm
                    reservationID={resID}
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
                    : <EmptyArrayContainer className="min-h-28" text="There Are No Notes"/>
            }
        </section>
    );
};