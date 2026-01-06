/**
 * @file SeatQueryKeys.ts
 *
 * Centralized React Query keys for seat-related queries.
 * Ensures consistent cache keys and safe query invalidation
 * across seat fetch and mutation hooks.
 */

/**
 * Query keys for fetching a single seat.
 *
 * Typically used for:
 * - Fetching a seat by unique identifier
 * - Fetching a seat by slug or alternate identifier
 */
export const SeatIDQueryKeys = [
    "fetch_seat_by_id",
    "fetch_seat_by_slug",
] as const;

/**
 * Query keys for fetching seat collections.
 *
 * Typically used for:
 * - Filtered seat queries
 * - Paginated seat listings
 */
export const SeatListQueryKeys = [
    "fetch_seats_by_query",
    "fetch_paginated_seats_by_query",
] as const;
