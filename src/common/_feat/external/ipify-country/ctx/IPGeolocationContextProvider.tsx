/**
 * @fileoverview Context provider for managing and distributing user IP geolocation data.
 */

import {useFetchUserCountry} from "@/common/_feat/external/ipify-country/hooks/useFetchUserCountry.ts";
import {ReactElement, ReactNode, useEffect, useState} from "react";
import {IpString} from "@/common/_schemas/strings/ip-string/IpSchema.ts";
import {IpifyLocation} from "@/common/schema/api/ipify/IpifyPayload.types.ts";
import {
    IPGeolocationContext,
    IPGeolocationContextValues
} from "@/common/_feat/external/ipify-country/ctx/IPGeolocationContext.ts";

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