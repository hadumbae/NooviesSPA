/**
 * @fileoverview Administrative card component showing a profile summary of the user who made the reservation.
 */

import {ReactElement} from "react";
import {Card, CardContent, Separator} from "@/views/common/_comp/ui";
import {LabelContent, SubsectionSubtitle, SubsectionTitle} from "@/views/common/_comp";
import {LeanUserWithEmail} from "@/domains/users";

/** Props for the CustomerReservationUserSummaryCard component. */
type CardProps = {
    user: LeanUserWithEmail;
};

/**
 * Renders a card displaying administrative details of the customer profile linked to the reservation.
 */
export function CustomerReservationUserSummaryCard(
    {user: {_id, name, email}}: CardProps
): ReactElement {
    return (
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
    );
}