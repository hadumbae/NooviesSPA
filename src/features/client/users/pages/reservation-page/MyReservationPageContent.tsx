/**
 * @file MyReservationPageContent.tsx
 * Composes reservation detail, seating, and action sections.
 */

import {ReservationDetails} from "@/pages/reservation/schema/model/reservation/ReservationDetails.types.ts";
import {formatReservationDetails} from "@/pages/reservation/formatters/formatReservationDetails.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MyReservationPageHeader
    from "@/features/client/users/pages/reservation-page/headers/MyReservationPageHeader.tsx";
import MyReservationInfoCard from "@/features/client/users/pages/reservation-page/card/MyReservationInfoCard.tsx";
import MyReservationSeatingCard from "@/features/client/users/pages/reservation-page/card/MyReservationSeatingCard.tsx";
import MyReservationStatusActions
    from "@/features/client/users/pages/reservation-page/mutations/MyReservationStatusActions.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * Props for MyReservationPageContent
 */
type ContentProps = {
    reservation: ReservationDetails;
};

/**
 * Renders reservation details with conditional seating and actions.
 */
const MyReservationPageContent = ({reservation}: ContentProps) => {
    const navigate = useLoggedNavigate();

    const {
        _id,
        title,
        posterImage,
        isSpecialEvent,
        reservationType,
        status,
        _ids: {showingID},
        formatted: {movieReleaseDate, movieGenres},
    } = formatReservationDetails(reservation);

    const navigateToProfile = () => {
        navigate({
            level: "log",
            to: "/account/profile?activeTab=reservations",
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
                    onSubmitSuccess={navigateToProfile}
                    status={status}
                />
            }
        </PageFlexWrapper>
    );
};

export default MyReservationPageContent;
