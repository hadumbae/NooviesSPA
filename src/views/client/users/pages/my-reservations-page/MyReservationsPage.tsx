/**
 * @fileoverview Entry point for the authenticated user's reservations management page.
 */

import useParsedPaginationValue from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import MyReservationsPageContent from "@/views/client/users/pages/my-reservations-page/ MyReservationsPageContent.tsx";
import {CurrentUserReservationLoader} from "@/views/client/reservations/_feat";

const RESERVATIONS_PER_PAGE = 20;

/**
 * Orchestrates pagination state and data loading for the authenticated user's reservations.
 */
const MyReservationsPage = () => {
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    return (
        <CurrentUserReservationLoader page={page} perPage={RESERVATIONS_PER_PAGE}>
            {({totalItems, items: reservations}) => (
                <MyReservationsPageContent
                    page={page}
                    perPage={RESERVATIONS_PER_PAGE}
                    setPage={setPage}
                    reservations={reservations}
                    totalReservations={totalItems}
                />
            )}
        </CurrentUserReservationLoader>
    );
};

export default MyReservationsPage;