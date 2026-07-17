/**
 * @fileoverview Provides a utility to retrieve and validate Ipify geolocation data from local storage.
 */

import {LocalStorageKeys} from "@/common/_const/storage/LocalStorageKeys.ts";
import {parseJSON} from "@/common/_feat/use-fetch-api/json/parseJSON.ts";
import {ParseError} from "@/common/_err/ParseError.ts";
import {IpifyLocalStorageSchema} from "@/common/_feat/external/ipify-country/schema/IpifyLocalStorageSchema";

/** Retrieves the Ipify payload from local storage and validates it against the expected schema. */
export function getIpifyPayloadData() {
    const itemString = localStorage.getItem(LocalStorageKeys.ipifyCountry);
    if (!itemString) return null;

    const itemValue = parseJSON({
        raw: itemString,
        source: getIpifyPayloadData.name,
        message: "Failed to parse Ipify payload. Malformed data."
    });

    const {data, success, error} = IpifyLocalStorageSchema.safeParse(itemValue);

    if (!success) {
        throw new ParseError({
            raw: itemValue,
            message: "Malformed Ipify Data.",
            errors: error?.errors,
        });
    }

    return data;
}