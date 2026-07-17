/**
 * @fileoverview Formatter utility for transforming raw location data into displayable address strings.
 */

import {Location} from "@/common/_models/location/LocationSchema.ts";
import {ISO3166Alpha2CountryConstant} from "@/common/_const";

/** Formats a location object into a structured address with a human-readable country name. */
export function formatLocationDetails(location: Location) {
    const {country, state, city, street, timezone, postalCode} = location;

    const countryName = ISO3166Alpha2CountryConstant[country];

    const address = [street, city, state, countryName]
        .filter(v => !!v)
        .join(", ");

    return {
        street,
        city,
        state,
        country,
        postalCode,
        timezone,
        address,
        countryName,
        location,
    };
}
