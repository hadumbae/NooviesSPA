/**
 * @fileoverview Utility function for retrieving the current date in ISO format.
 */

import {DateTime} from "luxon";
import {DateOnlyString} from "@/common/_schemas";

/** Returns the current local date as a date-only ISO string. */
export function getTodayDateOnly(): DateOnlyString {
    return DateTime.now().toISODate()!;
}