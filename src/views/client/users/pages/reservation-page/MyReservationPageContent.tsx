/**
 * @file MyReservationPageContent.tsx
 * Composes reservation detail, seating, and action sections.
 */

import {formatReservationDetails} from "@/domains/reservation/formatters/formatReservationDetails.ts";
import PageFlexWrapper from "@/views/common/_comp/page/PageFlexWrapper.tsx";
import MyReservationPageHeader
    from "@/views/client/users/pages/reservation-page/headers/MyReservationPageHeader.tsx";
import MyReservationInfoCard from "@/views/client/users/pages/reservation-page/card/MyReservationInfoCard.tsx";
import MyReservationSeatingCard from "@/views/client/users/pages/reservation-page/card/MyReservationSeatingCard.tsx";
import MyReservationStatusActions
    from "@/views/client/users/pages/reservation-page/mutations/MyReservationStatusActions.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {PopulatedReservation} from "@/domains/reservation/schema/model";

/**
 * Props for MyReservationPageContent
 */
type ContentProps = {
    reservation: PopulatedReservation;
};

/**
 * Renders reservation details with conditional seating and actions.
 */
const MyReservationPageContent = ({reservation}: ContentProps) => {
    const navigate = useLoggedNavigate();

    const {
        _id,
        reservationType,
        status,
        _ids: {showingID},
        formatted: {movieReleaseDate, movieGenres},
        showing: {movie: {title, posterImage}, config: {isSpecialEvent}},
    } = formatReservationDetails(reservation);

    const navigateToReservations = () => {
        navigate({
            level: "log",
            to: "/account/reservations",
            message: `Navigate after reservation update.`,
            component: MyReservationStatusActions.name,
        });
    }

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

            {
                reservationType === "RESERVED_SEATS" &&
                <MyReservationSeatingCard
                    showingID={showingID}
                    selectedSeating={reservation.selectedSeating!}
                />
            }

            {
                (status === "RESERVED" || status === "PAID") &&
                <MyReservationStatusActions
                    reservationID={_id}
                    onSubmitSuccess={navigateToReservations}
                    status={status}
                />
            }
        </PageFlexWrapper>
    );
};

export default MyReservationPageContent;
