/**
 * @fileoverview Constant definition for the Movie Client View Data API base path.
 * Centralizes the URL structure for public-facing movie data, ensuring
 * consistency across various client platforms (e.g., desktop, mobile).
 */

import {VIEW_CLIENT} from "@/common/features/fetch-api/apiEnvValues.ts";

/**
 * The base path for fetching movie-related view data.
 */
const baseURL = `/api/v1/views/${VIEW_CLIENT}/movies/client`;

export {
    baseURL as MovieClientViewBaseURL,
};