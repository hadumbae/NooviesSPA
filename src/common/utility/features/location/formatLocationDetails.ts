import {Location} from "@/common/schema/models/location/Location.schema.ts";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";

/**
 * **formatLocationDetails**
 *
 * Formats a `Location` object into a detailed, human-readable structure.
 *
 * ### Parameters
 * @param location - A `Location` object validated by {@link LocationSchema}.
 *
 * ### Returns
 * An object containing:
 * - `street`: Street address (optional).
 * - `city`: City name.
 * - `state`: State or region (optional).
 * - `country`: ISO 3166-1 alpha-2 country code.
 * - `postalCode`: Postal or ZIP code (optional).
 * - `timezone`: IANA timezone string.
 * - `address`: Concatenated human-readable address (`street, city, state, countryName`), filtering out empty fields.
 * - `countryName`: Full country name resolved from ISO code.
 * - `location`: The original `Location` object.
 *
 * ### Example
 * ```ts
 * const locationDetails = formatLocationDetails({
 *   street: "123 Main St",
 *   city: "Bangkok",
 *   state: "Bangkok",
 *   country: "TH",
 *   postalCode: "10110",
 *   timezone: "Asia/Bangkok"
 * });
 *
 * console.log(locationDetails.address);
 * // "123 Main St, Bangkok, Bangkok, Thailand"
 * console.log(locationDetails.countryName);
 * // "Thailand"
 * ```
 */
export default function formatLocationDetails(location: Location) {
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
