/**
 * @fileoverview Context definition for managing and distributing IP-based geolocation data.
 */

import {createContext, Dispatch, SetStateAction} from "react";
import {IpString} from "@/common/_schemas/strings/ip-string/IpSchema.ts";
import {IpifyLocation, IpifyPayloadData} from "@/common/_feat/external/ipify-country/schema";

/** Values and state setters provided by the IP geolocation context. */
export type IPGeolocationContextValues = Partial<IpifyPayloadData> & {
    setIsp: Dispatch<SetStateAction<string | undefined>>;
    setIp: Dispatch<SetStateAction<IpString | undefined>>;
    setLocation: Dispatch<SetStateAction<IpifyLocation | undefined>>;
};

/** React context for accessing IP address and geographic location information. */
export const IPGeolocationContext = createContext<IPGeolocationContextValues | undefined>(undefined);