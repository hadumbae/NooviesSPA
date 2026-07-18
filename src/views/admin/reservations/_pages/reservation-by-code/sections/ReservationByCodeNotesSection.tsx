/**
 * @fileoverview UI section for displaying and managing administrative reservation notes.
 */

import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";
import {ObjectId} from "@/common/_schemas";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {Button} from "@/common/components/ui/button.tsx";
import {Pencil} from "lucide-react";
import {ReactElement, useState} from "react";
import {ReservationNotesText} from "@/views/admin/reservations/_comp";
import {UpdateReservationNotesForm, UpdateReservationNotesFormPopup} from "@/views/admin/reservations/_feat";

/** Props for the ReservationByCodeNotesSection component. */
type SectionProps = {
    resID: ObjectId
    notes?: string | null;
};

/**
 * Layout section that displays persistent admin notes and provides a trigger for editing.
 */
export function ReservationByCodeNotesSection(
    {resID, notes}: SectionProps
): ReactElement {
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
}