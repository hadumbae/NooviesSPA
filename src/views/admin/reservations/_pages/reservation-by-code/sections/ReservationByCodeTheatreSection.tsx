/**
 * @fileoverview Physical venue and auditorium details section for a reservation.
 */

import {ReactElement} from "react";
import {Card, CardContent, Separator} from "@/common/components/ui";
import {ISO3166Alpha2CountryConstant} from "@/common/_const";
import {LabelContent, PageSectionHeader, SubsectionTitle} from "@/views/common/_comp";
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

    // const orientation: OrientationValues = "vertical";

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
                        <LabelContent label="Street" classNames={{container: "col-span-2"}}>
                            {street}
                        </LabelContent>

                        <LabelContent label="City">
                            {city}
                        </LabelContent>

                        <LabelContent label="State">
                            {state ?? "-"}
                        </LabelContent>

                        <LabelContent label="Country" classNames={{container: "col-span-2"}}>
                            {ISO3166Alpha2CountryConstant[country]}
                        </LabelContent>

                        <LabelContent label="Postal Code">
                            {postalCode ?? "-"}
                        </LabelContent>

                        <LabelContent label="Timezone">
                            {timezone}
                        </LabelContent>
                    </div>

                    <Separator/>

                    <div className="grid grid-cols-2 gap-2">
                        <LabelContent label="Screen">
                            {screenName}
                        </LabelContent>

                        <LabelContent label="Screen Type">
                            {screenType}
                        </LabelContent>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}