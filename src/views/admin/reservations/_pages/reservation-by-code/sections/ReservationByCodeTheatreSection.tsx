/**
 * @fileoverview Physical venue and auditorium details section for a reservation.
 */

import {ReactElement} from "react";
import {Card, CardContent, Separator} from "@/common/components/ui";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import {OrientationValues} from "@/common/_schemas/enums/OrientationEnumSchema.ts";
import {ISO3166Alpha2CountryConstant} from "@/common/_const";
import {PageSectionHeader, SubsectionTitle} from "@/views/common/_comp";
import {AdminReservation} from "@/domains/reservations";

/** Props for the ReservationByCodeTheatreSection component. */
type SectionProps = {
    reservation: AdminReservation;
};

/**
 * Displays the geographical and technical details of the venue where the showing occurs.
 */
export function ReservationByCodeTheatreSection(
    {reservation}: SectionProps
): ReactElement {
    const {snapshot: {theatre, screen}} = reservation;
    const {name: theatreName, country, street, city, state, postalCode, timezone} = theatre;
    const {name: screenName, screenType} = screen;

    const orientation: OrientationValues = "vertical";

    return (
        <section className="space-y-4">
            <PageSectionHeader text="Theatre"/>

            <Card>
                <CardContent className="p-3 space-y-3">
                    <div>
                        <SubsectionTitle as="h2">{theatreName}</SubsectionTitle>
                        <h3 className="secondary-text text-sm font-bold">Theatre</h3>
                    </div>

                    <Separator/>

                    <div className="grid grid-cols-2 gap-2 lg:gap-3">
                        <LabeledGroup label="Street" orientation={orientation} className="col-span-2">
                            {street}
                        </LabeledGroup>

                        <LabeledGroup label="City" orientation={orientation}>
                            {city}
                        </LabeledGroup>

                        <LabeledGroup label="State" orientation={orientation}>
                            {state ?? "-"}
                        </LabeledGroup>

                        <LabeledGroup label="Country" orientation={orientation} className="col-span-2">
                            {ISO3166Alpha2CountryConstant[country]}
                        </LabeledGroup>

                        <LabeledGroup label="Postal Code" orientation={orientation}>
                            {postalCode ?? "-"}
                        </LabeledGroup>

                        <LabeledGroup label="Timezone" orientation={orientation}>
                            {timezone}
                        </LabeledGroup>
                    </div>

                    <Separator/>

                    <div className="grid grid-cols-2 gap-2">
                        <LabeledGroup label="Screen" orientation={orientation}>
                            {screenName}
                        </LabeledGroup>

                        <LabeledGroup label="Screen Type" orientation={orientation}>
                            {screenType}
                        </LabeledGroup>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}