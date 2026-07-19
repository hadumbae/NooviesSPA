/**
 * @fileoverview Section component for displaying user details within the reservation by code view.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/views/common/_comp/ui/card.tsx";
import {Separator} from "@/views/common/_comp/ui/separator.tsx";
import {LabelContent, SectionTitle, SubsectionSubtitle, SubsectionTitle} from "@/views/common/_comp";

import {AdminReservation} from "@/domains/reservations";

/** Props for the ReservationByCodeUserSection component. */
type SectionProps = {
    reservation: AdminReservation;
};

/** Displays the name, ID, and email of the user associated with a specific reservation. */
export function ReservationByCodeUserSection(
    {reservation: {user: {_id, name, email}}}: SectionProps
): ReactElement {
    return (
        <section className="space-y-4">
            <SectionTitle>User</SectionTitle>

            <Card>
                <CardContent className="p-4 space-y-3">
                    <div>
                        <SubsectionTitle>{name}</SubsectionTitle>
                        <SubsectionSubtitle>User</SubsectionSubtitle>
                    </div>

                    <Separator/>

                    <div className="grid grid-cols-2 gap-4">
                        <LabelContent label="ID" classNames={{container: "col-span-2"}}>
                            <span className="primary-text">{_id}</span>
                        </LabelContent>

                        <LabelContent label="Name">
                            <span className="primary-text">{name}</span>
                        </LabelContent>

                        <LabelContent label="Email">
                            <span className="primary-text">{email}</span>
                        </LabelContent>
                    </div>

                </CardContent>
            </Card>
        </section>
    );
}