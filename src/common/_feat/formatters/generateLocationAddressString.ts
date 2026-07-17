/**
 * @fileoverview Utility for formatting location objects into human-readable address strings.
 */

import type {Location} from "@/common/_models/location/LocationSchema.ts";

/** Converts a location object into a single string with configurable separators. */
export function generateLocationAddressString(location: Location, separator: string = ", "): string {
    const {street, city, state, country} = location;
    return [street, city, state, country].filter(v => v).join(separator);
}