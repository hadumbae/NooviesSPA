/**
 * @fileoverview Type definitions for the user reservations repository.
 */

import {CurrentUserReservationsQueryOptions} from "@/domains/reservations/_feat/fetch-current-user-reservations/schema";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";

/** Configuration for fetching user reservations including pagination and query filters. */
export type GetFetchUserReservationsConfig = PaginationValues & {
    queries?: CurrentUserReservationsQueryOptions;
};