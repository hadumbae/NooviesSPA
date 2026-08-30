/**
 * @fileoverview Hook for managing Ipify API payload data within local storage.
 */

import {useEffect, useState} from "react";
import {getIpifyStorageData} from "@/common/_feat/external/ipify-country/utils/getIpifyStorageData.ts";
import {setIpifyStorageData} from "@/common/_feat/external/ipify-country/utils/setIpifyStorageData.ts";

import {IpifyPayloadData} from "@/common/_feat/external/ipify-country/schema/IpifyPayloadSchema";

/** Synchronizes Ipify payload state with local storage persistence. */
export function useGetIpifyLocalStorageData() {
    const [fetched, setFetched] = useState<boolean>(() => {
        try {
            return getIpifyStorageData()?.fetched ?? false;
        } catch {
            return false;
        }
    });

    const [payload, setPayload] = useState<IpifyPayloadData | null>(() => {
        try {
            return getIpifyStorageData()?.payload ?? null;
        } catch {
            setIpifyStorageData(null)
            return null;
        }
    });

    useEffect(() => {
        setIpifyStorageData({fetched, payload});
    }, [fetched, payload]);

    return {
        fetched,
        setFetched,
        payload,
        setPayload,
    };
}