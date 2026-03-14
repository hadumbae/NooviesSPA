/**
 * @file Utility for storing validated Ipify data in localStorage.
 * @filename setIpifyPayloadData.ts
 */

import { IpifyLocalStorageData } from "@/common/schema/api/ipify/IpifyPayload.types.ts";
import { LocalStorageKeys } from "@/common/constants/LocalStorageKeys.ts";
import { IpifyLocalStorageSchema } from "@/common/schema/api/ipify/IpifyPayload.schema.ts";
import { ParseError } from "@/common/errors/ParseError.ts";

/**
 * Persists Ipify payload data to localStorage after schema validation.
 *
 * Passing `null` removes the stored entry.
 *
 * @param value - Ipify local storage data to persist.
 *
 * @throws ParseError If the provided value does not conform to {@link IpifyLocalStorageSchema}.
 */
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