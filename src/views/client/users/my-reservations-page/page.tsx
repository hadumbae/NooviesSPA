/**
 * @fileoverview Entry point for the authenticated user's reservations management page.
 */

import useParsedPaginationValue from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {MyReservationsPageContent} from "@/views/client/users/my-reservations-page/content.tsx";
import {ReactElement} from "react";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchReservationsForCurrentUser} from "@/domains/reservations/_feat";

const RESERVATIONS_PER_PAGE = 20;

/**
 * Orchestrates pagination state and data loading for the authenticated user's reservations.
 */
export function MyReservationsPage(): ReactElement {
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const query = useFetchReservationsForCurrentUser({
        pagination: {page, perPage: RESERVATIONS_PER_PAGE},
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items: reservations}) => (
                <MyReservationsPageContent
                    page={page}
                    perPage={RESERVATIONS_PER_PAGE}
                    setPage={setPage}
                    reservations={reservations}
                    totalReservations={totalItems}
                />
            )}
        </QueryDataLoader>
    );
}