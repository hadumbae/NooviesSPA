/**
 * @file Detailed data section displaying movie, showtime, and transactional metadata for a reservation.
 * @filename ReservationByCodeRelatedDataSection.tsx
 */

import {AdminReservation} from "@/domains/reservation/schema/model";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";
import PrimarySpan from "@/views/common/components/text/PrimarySpan.tsx";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import PosterImage from "@/domains/movies/components/images/PosterImage.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import buildShowingDateString from "@/domains/showings/utilities/buildShowingDateString.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import {OrientationValues} from "@/common/schema/enums/OrientationEnumSchema.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the {@link ReservationByCodeDetailsSection} component.
 */
type SectionProps = {
    /** The administrative reservation object containing snapshots of movie, theatre, and transaction data. */
    reservation: AdminReservation;
};

/**
 * Renders a comprehensive "Related Data" block including movie details and booking specifics.
 */
export const ReservationByCodeDetailsSection = (
    {reservation}: SectionProps
) => {
    const {
        snapshot: {
            movie: {title, runtime, genres, posterURL, releaseDate},
            theatre: {timezone},
            startTime,
            endTime,
        },
        reservationType,
        pricePaid,
        currency,
        ticketCount,
        expiresAt,
    } = reservation;

    const isMobile = useIsMobile();
    const labelOrientation: OrientationValues = isMobile ? "vertical" : "horizontal";

    const movieGenres = genres.length > 0 ? genres.join(", ") : "-"
    const movieRuntime = formatMovieRuntime(runtime, true)
    const movieReleaseYear = releaseDate ? releaseDate.toFormat("yyyy") : "Unreleased";

    const showtime = buildShowingDateString({start: startTime, end: endTime, timezone});
    const resType = convertToTitleCase(reservationType.replace("_", " "));

    const expiryDate = expiresAt.toFormat("HH:mm:ss dd MMM, yyyy");
    const isExpired = new Date() > expiresAt.toJSDate();

    return (
        <section className="space-y-4">
            <SectionHeader className={SectionHeaderCSS}>
                Related Data
            </SectionHeader>

            <div className="flex space-x-3">
                <div>
                    <PosterImage className="h-36 md:h-48" src={posterURL}/>
                </div>

                <Card className="flex-1">
                    <CardContent className="p-3 space-y-2">
                        {/** Movie Title and Categorization */}
                        <div className="space-y-1">
                            <PrimaryHeaderText as="h2">{title}</PrimaryHeaderText>
                            <div className="flex max-md:flex-col max-md:space-y-1 md:space-x-5">
                                <SecondaryHeaderText as="h3">
                                    {movieReleaseYear} • {movieRuntime}
                                </SecondaryHeaderText>
                                <SecondaryHeaderText as="h3">
                                    {movieGenres}
                                </SecondaryHeaderText>
                            </div>
                        </div>

                        <Separator/>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <LabeledGroup
                                className="md:col-span-2"
                                label="Showtime"
                                orientation={labelOrientation}
                            >
                                <PrimarySpan>{showtime}</PrimarySpan>
                            </LabeledGroup>

                            <LabeledGroup label="Price" orientation={labelOrientation}>
                                <PrimarySpan>{pricePaid} {currency} for {ticketCount} Tickets</PrimarySpan>
                            </LabeledGroup>

                            <LabeledGroup label="Type" orientation={labelOrientation}>
                                <PrimarySpan>{resType}</PrimarySpan>
                            </LabeledGroup>

                            <LabeledGroup
                                className="md:col-span-2"
                                label={isExpired ? "Expired" : "Expires At"}
                                orientation={labelOrientation}
                            >
                                <PrimarySpan className={cn(isExpired && "text-red-500")}>
                                    {expiryDate}
                                </PrimarySpan>
                            </LabeledGroup>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};