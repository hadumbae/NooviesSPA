/**
 * @fileoverview Composes the reservation detail, seating, and action sections for the user reservation page.
 */


import {formatReservationDetails} from "@/domains/reservation/_feat/formatters/formatReservationDetails.ts";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {MyReservationPageHeader} from "src/views/client/users/reservation-page/headers/header.tsx";
import {
    MyReservationInfoCard
} from "@/views/client/users/reservation-page/card/MyReservationInfoCard.tsx";
import {
    MyReservationSeatingCard
} from "@/views/client/users/reservation-page/card/MyReservationSeatingCard.tsx";
import {
    MyReservationStatusActions
} from "@/views/client/users/reservation-page/mutations/MyReservationStatusActions.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {PopulatedReservation} from "@/domains/reservation/schema/model";
import {ReactElement} from "react";

/** Props for the MyReservationPageContent component. */
type ContentProps = {
    reservation: PopulatedReservation;
};

/**
 * Renders the reservation details view including conditional seating maps and status management actions.
 */
export function MyReservationPageContent(
    {reservation}: ContentProps
): ReactElement {
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
}
