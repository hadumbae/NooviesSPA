/**
 * @fileoverview HTTP status text overrides for theatre-related requests.
 */

import {HttpStatusOverrideText} from "@/common/_types/error/HttpErrorTypes.ts";

/**
 * Theatre-specific HTTP status text mappings.
 */
export const TheatreHttpStatusOverrideText: HttpStatusOverrideText = {
    404: "Theatre Not Found!",
    500: "Failed To Fetch Theatre Data. Please Try Again.",
};