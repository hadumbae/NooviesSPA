/**
 * @file React hook for accessing and initializing cached Ipify data from localStorage.
 * @filename useGetIpifyLocalStorageData.ts
 */

import {useEffect, useState} from "react";
import {IpifyPayloadData} from "@/common/schema/api/ipify/IpifyPayload.types.ts";
import {getIpifyPayloadData} from "@/common/utility/getters/getIpifyPayloadData.ts";
import {setIpifyPayloadData} from "@/common/utility/setters/setIpifyPayloadData.ts";

/**
 * Provides stateful access to Ipify payload data persisted in localStorage.
 *
 * Initializes state from stored data when available and resets the cache if
 * malformed data is encountered.
 *
 * @returns Local Ipify state and setters for `fetched` and `payload`.
 */

export function useGetIpifyLocalStorageData() {
    const [fetched, setFetched] = useState<boolean>(() => {
        try {
            return getIpifyPayloadData()?.fetched ?? false;
        } catch {
            return false;
        }
    });

    const [payload, setPayload] = useState<IpifyPayloadData | null>(() => {
        try {
            return getIpifyPayloadData()?.payload ?? null;
        } catch {
            setIpifyPayloadData(null)
            return null;
        }
    });

    useEffect(() => {
        setIpifyPayloadData({fetched, payload});
    }, [fetched, payload]);

    return {
        fetched,
        setFetched,
        payload,
        setPayload,
    };
}