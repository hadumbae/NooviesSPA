/**
 * @fileoverview Entry point for the authenticated user's reservations management page.
 */

import useParsedPaginationValue from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {MyReservationsPageContent} from "@/views/client/users/my-reservations-page/content.tsx";
import {ReactElement} from "react";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {
    CurrentUserReservationsQueryOptionSchema,
    useFetchReservationsForCurrentUser
} from "@/domains/reservations/_feat";
import {useParsedSearchParams} from "@/common/_feat";

const RESERVATIONS_PER_PAGE = 20;

/**
 * Orchestrates pagination state and data loading for the authenticated user's reservations.
 */
export function MyReservationsPage(): ReactElement {
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams} = useParsedSearchParams({schema: CurrentUserReservationsQueryOptionSchema});

    const query = useFetchReservationsForCurrentUser({
        pagination: {page, perPage: RESERVATIONS_PER_PAGE},
        queries: searchParams,
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