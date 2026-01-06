/**
 * @file ScreenQueryKeys.ts
 *
 * Centralized React Query keys for screen-related queries.
 * Used to ensure consistent cache identification and
 * safe query invalidation across the application.
 */

/**
 * Query keys for fetching a single screen.
 *
 * Typically used for:
 * - Fetching a screen by unique identifier
 * - Fetching a screen by slug or alternate identifier
 */
export const ScreenIDQueryKeys = [
    "fetch_screen_by_id",
    "fetch_screen_by_slug",
] as const;

/**
 * Query keys for fetching lists of screens.
 *
 * Typically used for:
 * - Filtered screen queries
 * - Paginated screen listings
 */
export const ScreenListQueryKeys = [
    "fetch_screen_by_query",
    "fetch_paginated_screen_by_query",
] as const;
