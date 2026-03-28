/**
 * @file Physical venue and auditorium details section for a reservation.
 * @filename ReservationByCodeTheatreSection.tsx
 */

import {AdminReservation} from "@/domains/reservation/schema/model";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import {OrientationValues} from "@/common/schema/enums/OrientationEnumSchema.ts";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import {Separator} from "@/common/components/ui/separator.tsx";

/**
 * Props for the {@link ReservationByCodeTheatreSection} component.
 */
type SectionProps = {
    /** The reservation record containing the theatre and screen snapshots. */
    reservation: AdminReservation;
};

/**
 * Renders the geographical and technical details of the venue where the showing occurs.
 */
export const ReservationByCodeTheatreSection = (
    {reservation}: SectionProps
) => {
    const {snapshot: {theatre, screen}} = reservation;
    const {name: theatreName, country, street, city, state, postalCode, timezone} = theatre;
    const {name: screenName, screenType} = screen;

    const orientation: OrientationValues = "vertical";

    return (
        <section className="space-y-4">
            <SectionHeader className={SectionHeaderCSS}>
                Theatre
            </SectionHeader>

            <Card>
                <CardContent className="p-3 space-y-3">
                    <div>
                        <PrimaryHeaderText as="h2">{theatreName}</PrimaryHeaderText>
                        <SecondaryHeaderText as="h3">Theatre</SecondaryHeaderText>
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
};