/**
 * @file Entry point for the authenticated user's reservations management page.
 * @filename MyReservationsPage.tsx
 */

import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import CurrentUserReservationLoader from "@/domains/reservation/components/loaders/CurrentUserReservationLoader.tsx";
import MyReservationsPageContent from "@/views/client/users/pages/my-reservations-page/ MyReservationsPageContent.tsx";

/** * Constant determining the number of reservation cards displayed per page.
 */
const RESERVATIONS_PER_PAGE = 20;

/**
 * Orchestrates pagination state and data loading for the user's reservations.
 * * @description
 * 1. Synchronizes the `page` state with the URL search parameters via {@link useParsedPaginationValue}.
 * 2. Utilizes {@link CurrentUserReservationLoader} to handle the async fetch and schema validation.
 * 3. Passes validated data and pagination controls to {@link MyReservationsPageContent}.
 * * @returns {JSX.Element} The composed reservations page.
 */
const MyReservationsPage = () => {
    /** Pagination state synchronized with the "page" query parameter. */
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