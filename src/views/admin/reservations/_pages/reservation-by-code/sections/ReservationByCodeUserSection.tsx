/**
 * @fileoverview Section component for displaying user details within the reservation by code view.
 *
 */

import {AdminReservation} from "@/domains/reservation/_schema/model";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {SubsectionTitle} from "@/views/common/_comp/headers/SubsectionTitle.tsx";
import {SubsectionSubtitle} from "@/views/common/_comp/headers/SubsectionSubtitle.tsx";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import PrimarySpan from "@/views/common/_comp/text/PrimarySpan.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {ReactElement} from "react";

/** Props for the ReservationByCodeUserSection component. */
type SectionProps = {
    reservation: AdminReservation;
};

/** Displays the name, ID, and email of the user associated with a specific reservation. */
export function ReservationByCodeUserSection(
    {reservation}: SectionProps
): ReactElement {
    const {user: {_id, name, email}} = reservation;

    return (
        <section className="space-y-4">
            <SectionHeader className={SectionHeaderCSS}>
                User
            </SectionHeader>

            <Card>
                <CardContent className="p-4 space-y-3">
                    <div>
                        <SubsectionTitle>{name}</SubsectionTitle>
                        <SubsectionSubtitle>User</SubsectionSubtitle>
                    </div>

                    <Separator/>

                    <div className="grid grid-cols-2 gap-4">
                        <LabeledGroup label="ID" orientation="vertical" className="col-span-2">
                            <PrimarySpan>{_id}</PrimarySpan>
                        </LabeledGroup>

                        <LabeledGroup label="Name" orientation="vertical">
                            <PrimarySpan>{name}</PrimarySpan>
                        </LabeledGroup>

                        <LabeledGroup label="Email" orientation="vertical">
                            <PrimarySpan>{email}</PrimarySpan>
                        </LabeledGroup>
                    </div>

                </CardContent>
            </Card>
        </section>
    );
}