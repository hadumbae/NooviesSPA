import type {Location} from "@/common/schema/location/Location.schema.ts";

/**
 * Returns a human-readable address string from a {@link Location} object.
 *
 * The address parts (`street`, `city`, `state`, `country`) are concatenated
 * using the given separator and any empty or falsy parts are omitted.
 *
 * @param location - The location object containing address fields.
 * @param separator - The string to separate each part of the address. Defaults to ", ".
 * @returns The concatenated address string.
 */
export default function generateLocationAddressString(location: Location, separator: string = ", "): string {
    const {street, city, state, country} = location;
    return [street, city, state, country].filter(v => v).join(separator);
}