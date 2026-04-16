/**
 * @fileoverview Constant definition for the Genre Client View Data API endpoint.
 * This URL is used by the frontend to fetch public-facing genre data aggregated
 * for specific client platforms.
 */

/**
 * The base URL for fetching genre-related view data specifically for the client application.
 */
export const GenreClientViewDataBaseURL = `${import.meta.env.VITE_API_URL}/api/v1/views/${import.meta.env.VITE_DEV_CLIENT_NAME}/client/genres`;