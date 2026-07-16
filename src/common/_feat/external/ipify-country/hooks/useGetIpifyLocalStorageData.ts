/**
 * @fileoverview Hook for managing Ipify API payload data within local storage.
 */

import {useEffect, useState} from "react";
import {IpifyPayloadData} from "@/common/schema/api/ipify/IpifyPayload.types.ts";
import {getIpifyPayloadData} from "@/common/utility/getters/getIpifyPayloadData.ts";
import {setIpifyPayloadData} from "@/common/utility/setters/setIpifyPayloadData.ts";

/** Synchronizes Ipify payload state with local storage persistence. */
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