/**
 * @file Provider for the IP geolocation React context.
 * @filename IPGeolocationContextProvider.ts
 */

import {useFetchUserCountry} from "@/common/hooks/api/useFetchUserCountry.ts";
import {ReactNode, useEffect, useState} from "react";
import {IpString} from "@/common/schema/strings/IpSchema.ts";
import {IpifyLocation} from "@/common/schema/api/ipify/IpifyPayload.types.ts";
import {
    IPGeolocationContext,
    IPGeolocationContextValues
} from "@/common/context/ip-geolocation-context/IPGeolocationContext.ts";

/**
 * Props for {@link IPGeolocationContextProvider}.
 */
type ProviderProps = {
    /** Child elements receiving the context. */
    children: ReactNode;
};

/**
 * Provides IP geolocation state and setters to the component tree.
 */
const IPGeolocationContextProvider = ({children}: ProviderProps) => {
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
};

export default IPGeolocationContextProvider;