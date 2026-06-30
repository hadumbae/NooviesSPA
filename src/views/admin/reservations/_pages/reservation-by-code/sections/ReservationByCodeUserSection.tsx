/**
 * @fileoverview Section component for displaying user details within the reservation by code view.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {SectionTitle, SubsectionSubtitle, SubsectionTitle} from "@/views/common/_comp";

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
                        <LabeledGroup label="ID" orientation="vertical" className="col-span-2">
                            <span className="primary-text">{_id}</span>
                        </LabeledGroup>

                        <LabeledGroup label="Name" orientation="vertical">
                            <span className="primary-text">{name}</span>
                        </LabeledGroup>

                        <LabeledGroup label="Email" orientation="vertical">
                            <span className="primary-text">{email}</span>
                        </LabeledGroup>
                    </div>

                </CardContent>
            </Card>
        </section>
    );
}