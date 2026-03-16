/**
 * @file React context for managing IP geolocation state.
 * @filename IPGeolocationContext.ts
 */

import {createContext, Dispatch, SetStateAction} from "react";
import {IpifyLocation, IpifyPayloadData} from "@/common/schema/api/ipify/IpifyPayload.types.ts";
import {IpString} from "@/common/schema/strings/IpSchema.ts";

/**
 * Values exposed by {@link IPGeolocationContext}.
 */
export type IPGeolocationContextValues = Partial<IpifyPayloadData> & {
    /** Updates the ISP value. */
    setIsp: Dispatch<SetStateAction<string | undefined>>;

    /** Updates the IP address. */
    setIp: Dispatch<SetStateAction<IpString | undefined>>;

    /** Updates the geolocation data. */
    setLocation: Dispatch<SetStateAction<IpifyLocation | undefined>>;
};

/**
 * Context for IP geolocation state.
 */
export const IPGeolocationContext = createContext<IPGeolocationContextValues | undefined>(undefined);