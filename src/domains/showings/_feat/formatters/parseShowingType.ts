/**
 * @fileoverview Formatter for converting showing seat types into human-readable strings.
 */

import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";

/** Converts a seat reservation boolean into a title-cased display string. */
export function parseShowingType(canReserveSeats?: boolean) {
    const typeString = canReserveSeats ? "RESERVED_SEATS" : "GENERAL_ADMISSION";
    return convertToTitleCase(typeString.replace(/_/g, " "));
}