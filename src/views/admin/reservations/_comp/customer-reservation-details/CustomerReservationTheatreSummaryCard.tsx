/**
 * @fileoverview Administrative view component for displaying the theatre and screen snapshot data of a reservation.
 */

import {ReactElement} from "react";
import {Card, CardContent, Separator} from "@/views/common/_comp/ui";
import {LabelContent, SubsectionTitle} from "@/views/common/_comp";
import {ISO3166Alpha2CountryConstant} from "@/common/_const";
import {AdminReservation} from "@/domains/reservations";

/** Props for the CustomerReservationTheatreSummaryCard component. */
type CardProps = {
    reservation: AdminReservation;
};

/**
 * Renders a card summarizing location details, venue address, and configuration of the assigned cinema screen.
 */
export function CustomerReservationTheatreSummaryCard(
    {reservation}: CardProps
): ReactElement {
    const {snapshot: {theatre, screen}} = reservation;
    const {name: theatreName, country, street, city, state, postalCode, timezone} = theatre;
    const {name: screenName, screenType} = screen;

    return (
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
    );
}