/**
 * @file MyReservationPageContent.tsx
 * Composes reservation page content sections.
 */

import {ReservationDetails} from "@/pages/reservation/schema/model/reservation/ReservationDetails.types.ts";
import {formatReservationDetails} from "@/pages/reservation/formatters/formatReservationDetails.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MyReservationPageHeader
    from "@/features/client/users/pages/reservation-page/headers/MyReservationPageHeader.tsx";
import MyReservationInfoCard from "@/features/client/users/pages/reservation-page/card/MyReservationInfoCard.tsx";

/**
 * Props for MyReservationPageContent.
 */
type ContentProps = {
    reservation: ReservationDetails;
};

/**
 * Renders reservation page layout.
 */
const MyReservationPageContent = ({reservation}: ContentProps) => {
    const {
        title,
        posterImage,
        isSpecialEvent,
        formatted: {movieReleaseDate, movieGenres},
    } = formatReservationDetails(reservation);

    return (
        <PageFlexWrapper>
            <MyReservationPageHeader
                movieTitle={title}
                posterImage={posterImage}
                genreNames={movieGenres}
                releaseYear={movieReleaseDate}
                isSpecialEvent={isSpecialEvent}
            />

            <MyReservationInfoCard
                reservation={reservation}
            />
        </PageFlexWrapper>
    );
};

export default MyReservationPageContent;
