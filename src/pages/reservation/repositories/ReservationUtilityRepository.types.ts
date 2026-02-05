/**
 * @file ReservationUtilityRepository.types.ts
 *
 * Type definitions for reservation utility API repositories.
 *
 * Describes the contract for client-side repositories
 * interacting with reservation utility endpoints.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

/**
 * Route contract for reservation utility APIs.
 *
 * @remarks
 * - Intended for read-only, user-scoped operations
 * - Designed to be implemented by client-side repositories
 */
export type ReservationUtilityRoutes = {
    /** Base URL for reservation utility endpoints */
    baseURL: string;

    /**
     * Fetch paginated reservations for the authenticated user.
     *
     * @param params - Optional pagination parameters
     * @returns Standardized API response
     */
    fetchUserReservations: (params?: PaginationValues) => Promise<RequestReturns>;
};
