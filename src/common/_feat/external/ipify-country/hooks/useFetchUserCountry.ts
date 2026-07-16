/**
 * @fileoverview Hook for managing and persisting user country data from the Ipify API.
 */

import {useFetchIPGeolocationData} from "@/common/_feat/external/ipify-country/hooks/useFetchIPGeolocationData.ts";
import {useGetIpifyLocalStorageData} from "@/common/_feat/external/ipify-country/hooks/useGetIpifyLocalStorageData.ts";
import {useEffect} from "react";
import {IpifyPayloadSchema} from "@/common/schema/api/ipify/IpifyPayload.schema.ts";
import {Logger} from "@/common/_feat/logger/Logger.ts";
import {ParseError} from "@/common/errors/ParseError.ts";
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {IpifyLocalStorageData} from "@/common/schema/api/ipify/IpifyPayload.types.ts";

/** Result object containing the stored country data and the active query state. */
type CountryReturns = {
    storedData: IpifyLocalStorageData;
    query: UseQueryResult<unknown, HttpResponseError>;
}

/**
 * Orchestrates fetching user geolocation data and synchronizing it with local storage.
 */
export function useFetchUserCountry(): CountryReturns {
    const {fetched, setFetched, payload, setPayload} = useGetIpifyLocalStorageData();

    const query = useFetchIPGeolocationData({options: {enabled: !fetched}});

    useEffect(() => {
        if (query.isSuccess && query.data) {
            const {success, data, error} = IpifyPayloadSchema.safeParse(query.data);

            if (success) {
                setFetched(true);
                setPayload(data);
            } else {
                setFetched(true);
                setPayload(null);

                Logger.error({
                    type: "ERROR",
                    msg: "Invalid Ipify Data Received.",
                    error: new ParseError({
                        errors: error.errors,
                        message: "Invalid Ipify Data Received.",
                        raw: query.data,
                    }),
                });
            }
        }

        if (query.isError) {
            setFetched(true);
            setPayload(null);
        }
    }, [query.isSuccess, query.isError, query.data, setFetched, setPayload]);

    return {
        storedData: {fetched, payload},
        query,
    }
}