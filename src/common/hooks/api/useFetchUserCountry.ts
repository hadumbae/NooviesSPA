/**
 * @file Retrieves and caches the user's country using the Ipify API.
 * Handles response validation and persists results to local storage.
 * @filename useFetchUserCountry.ts
 */

import {useFetchIPGeolocationData} from "@/common/hooks/api/useFetchIPGeolocationData.ts";
import {useGetIpifyLocalStorageData} from "@/common/hooks/api/ipify-country/useGetIpifyLocalStorageData.ts";
import {useEffect} from "react";
import {IpifyPayloadSchema} from "@/common/schema/api/ipify/IpifyPayload.schema.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {ParseError} from "@/common/errors/ParseError.ts";
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {IpifyLocalStorageData} from "@/common/schema/api/ipify/IpifyPayload.types.ts";

/**
 * Return shape for {@link useFetchUserCountry}.
 */
type CountryReturns = {
    /** Cached Ipify payload state stored in local storage. */
    storedData: IpifyLocalStorageData;

    /** React Query instance for the Ipify country request. */
    query: UseQueryResult<unknown, HttpResponseError>;
}

/**
 * Fetches the user's country via Ipify and stores the validated payload in local storage.
 *
 * The request executes only when the country has not been previously fetched.
 * Responses are validated against `IpifyPayloadSchema`; invalid responses are logged
 * and the cached payload is cleared.
 *
 * @returns Cached payload state and the underlying query instance.
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