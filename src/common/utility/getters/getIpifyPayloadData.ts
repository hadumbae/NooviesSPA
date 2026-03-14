/**
 * @file Utility for retrieving and validating cached Ipify data from localStorage.
 * @filename getIpifyPayloadData.ts
 */

import { LocalStorageKeys } from "@/common/constants/LocalStorageKeys.ts";
import parseJSON from "@/common/utility/features/use-fetch-api/parseJSON.ts";
import { IpifyLocalStorageSchema } from "@/common/schema/api/ipify/IpifyPayload.schema.ts";
import { ParseError } from "@/common/errors/ParseError.ts";

/**
 * Retrieves cached Ipify data from localStorage and validates it against the schema.
 *
 * @returns Parsed and validated Ipify local storage data, or `null` if no entry exists.
 *
 * @throws JSONParseError If the stored value cannot be parsed as JSON.
 * @throws ParseError If the parsed value does not conform to {@link IpifyLocalStorageSchema}.
 */
export function getIpifyPayloadData() {
    const itemString = localStorage.getItem(LocalStorageKeys.ipifyCountry);
    if (!itemString) return null;

    const itemValue = parseJSON({
        raw: itemString,
        source: getIpifyPayloadData.name,
        message: "Failed to parse Ipify payload. Malformed data."
    });

    const { data, success, error } = IpifyLocalStorageSchema.safeParse(itemValue);

    if (!success) {
        throw new ParseError({
            raw: itemValue,
            message: "Malformed Ipify Data.",
            errors: error?.errors,
        });
    }

    return data;
}