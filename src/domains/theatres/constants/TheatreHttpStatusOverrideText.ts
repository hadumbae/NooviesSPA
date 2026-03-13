/**
 * @file TheatreHttpStatusTextOverride.ts
 *
 * HTTP status text overrides for theatre-related requests.
 *
 * Provides domain-specific, user-friendly messages
 * for known HTTP error statuses returned by theatre APIs.
 */

import {HttpStatusOverrideText} from "@/common/type/error/HttpErrorTypes.ts";

/**
 * Theatre-specific HTTP status → message mappings.
 *
 * Intended to be passed into `QueryErrorBoundary` or
 * `QueryErrorHandler` to override default status text.
 */
export const TheatreHttpStatusOverrideText: HttpStatusOverrideText = {
    404: "Theatre Not Found!",
    500: "Failed To Fetch Theatre Data. Please Try Again.",
};
