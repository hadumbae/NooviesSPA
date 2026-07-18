/**
 * @fileoverview Context provider for managing and distributing user IP geolocation data.
 */

import {ReactElement, ReactNode, useEffect, useState} from "react";
import {useFetchUserCountry} from "@/common/_feat/external/ipify-country/hooks/useFetchUserCountry.ts";
import {IpString} from "@/common/_schemas/strings/ip-string/IpSchema.ts";
import {
    IPGeolocationContext,
    IPGeolocationContextValues
} from "@/common/_feat/external/ipify-country/ctx/IPGeolocationContext.ts";

import {IpifyLocation} from "@/common/_feat/external/ipify-country/schema/IpifyLocationSchema";

/** Props for the IPGeolocationContextProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/**
 * Provides IP address, ISP, and location data to the application via IPGeolocationContext.
 */
export function IPGeolocationContextProvider(
    {children}: ProviderProps
): ReactElement {
    const [isp, setIsp] = useState<string | undefined>(undefined);
    const [ip, setIp] = useState<IpString | undefined>(undefined);
    const [location, setLocation] = useState<IpifyLocation | undefined>(undefined);

    const {storedData: {fetched, payload}} = useFetchUserCountry();

    useEffect(() => {
        setIp(payload?.ip);
        setIsp(payload?.isp);
        setLocation(payload?.location);
    }, [fetched, payload]);

    const values: IPGeolocationContextValues = {
        ip,
        setIp,
        isp,
        setIsp,
        location,
        setLocation,
    };

    return (
        <IPGeolocationContext.Provider value={values}>
            {children}
        </IPGeolocationContext.Provider>
    );
}