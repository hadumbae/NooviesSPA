/**
 * @fileoverview Utility for persisting Ipify geolocation data to local storage.
 */

import { LocalStorageKeys } from "@/common/_const/storage/LocalStorageKeys.ts";
import { ParseError } from "@/common/_err/ParseError.ts";
import {
    IpifyLocalStorageData,
    IpifyLocalStorageSchema
} from "@/common/_feat/external/ipify-country/schema/IpifyLocalStorageSchema";

/** Validates and saves Ipify payload data to local storage or removes it if null. */
export function setIpifyPayloadData(value: IpifyLocalStorageData | null): void {
    if (!value) {
        localStorage.removeItem(LocalStorageKeys.ipifyCountry);
    }

    const { success, data, error } = IpifyLocalStorageSchema.safeParse(value);

    if (!success) {
        throw new ParseError({
            raw: value,
            message: "Invalid Ipify Data Input.",
            errors: error?.errors,
        });
    }

    localStorage.setItem(LocalStorageKeys.ipifyCountry, JSON.stringify(data));
}