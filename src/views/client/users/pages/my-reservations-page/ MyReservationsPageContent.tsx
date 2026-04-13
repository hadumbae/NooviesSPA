/**
 * @file Main content layout for the user's personal reservations list.
 * @filename MyReservationsPageContent.tsx
 */

import {PopulatedReservation} from "@/domains/reservation/schema/model/PopulatedReservationSchema.ts";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import MyReservationCompactCard from "@/views/client/reservations/components/cards/MyReservationCompactCard.tsx";
import MyReservationsPageHeader
    from "@/views/client/users/pages/my-reservations-page/header/MyReservationsPageHeader.tsx";

/**
 * Props for {@link MyReservationsPageContent}.
 */
type ContentProps = {
    /** Current active page index. */
    page: number;
    /** Number of records displayed per page. */
    perPage: number;
    /** Callback to update the current page state. */
    setPage: (page: number) => void;
    /** Array of validated {@link PopulatedReservation} records. */
    reservations: PopulatedReservation[];
    /** Total count of reservations for the authenticated user. */
    totalReservations: number;
}

/**
 * Renders the paginated list of reservations or an empty state.
 * @param props - {@link ContentProps}
 */
const MyReservationsPageContent = (
    {page, perPage, setPage, reservations, totalReservations}: ContentProps
) => {
    return (
        <PageFlexWrapper>
            <MyReservationsPageHeader />

            {
                reservations.length > 0 ? (
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {reservations.map((reservation) => (
                            <MyReservationCompactCard
                                key={reservation._id}
                                reservation={reservation}
                            />
                        ))}
                    </section>
                ) : (
                    <EmptyArrayContainer
                        className="flex-1"
                        text="You have no reservations."
                    />
                )
            }

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalReservations}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
};

export default MyReservationsPageContent;