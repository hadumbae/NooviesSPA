/**
 * @file ReservationUtilityRepository.ts
 *
 * Client-side repository for reservation utility endpoints.
 *
 * Provides read-only helpers for fetching user-scoped
 * reservation data from utility routes.
 *
 * Intended for:
 * - User dashboards
 * - Reservation history views
 * - Paginated list displays
 */

import {ReservationUtilityRoutes} from "@/pages/reservation/repositories/ReservationUtilityRepository.types.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/**
 * Reservation utility API repository.
 *
 * @remarks
 * - Wraps utility-level reservation endpoints
 * - Encapsulates URL construction and pagination handling
 * - Returns standardized {@link RequestReturns} responses
 */
const repository: ReservationUtilityRoutes = {
    /** Base API URL for reservation utility routes */
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/reservations/utils`,

    /**
     * Fetch a paginated list of reservations for the authenticated user.
     *
     * @remarks
     * - Pagination defaults to `{ page: 1, perPage: 20 }`
     * - Authentication is enforced server-side
     * - Intended for read-only UI consumption
     *
     * @param pagination - Pagination configuration
     * @returns API response containing paginated reservation data
     */
    async fetchUserReservations(
        {page, perPage}: PaginationValues = {page: 1, perPage: 20}
    ): Promise<RequestReturns> {
        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: "user/fetch-reservations",
            queries: {page, perPage},
        });

        return useFetchAPI({method: "GET", url});
    },
};

export {
    repository as ReservationUtilityRepository,
};
