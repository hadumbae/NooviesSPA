/**
 * @fileoverview Entry point for the authenticated user's reservations management page.
 */

import useParsedPaginationValue from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {MyReservationsPageContent} from "src/views/client/users/my-reservations-page/content.tsx";
import {CurrentUserReservationLoader} from "@/views/client/reservations/_feat";
import {ReactElement} from "react";

const RESERVATIONS_PER_PAGE = 20;

/**
 * Orchestrates pagination state and data loading for the authenticated user's reservations.
 */
export function MyReservationsPage(): ReactElement {
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
}