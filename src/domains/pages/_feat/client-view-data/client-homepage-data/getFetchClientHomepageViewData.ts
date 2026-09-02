/**
 * @fileoverview Custom hook for fetching client homepage view data with optional query parameters.
 */

import {
    ClientHomepageViewRouteConfig
} from "@/domains/pages/_feat/client-view-data/client-homepage-data/ClientHomepageViewRouteConfigSchema.ts";
import {buildURL, useFetchAPI} from "@/common/_feat";
import {ClientHomepageBaseURL} from "@/domains/pages/_feat/client-view-data/baseURL.ts";
import {FetchRequestReturns} from "@/common/_types";
import {
    ClientHomepageViewData
} from "@/domains/pages/_feat/client-view-data/client-homepage-data/ClientHomepageViewDataSchema.ts";

/** Configuration options for fetching client homepage view data. */
type FetchConfig = {
    queries?: ClientHomepageViewRouteConfig;
}

/** Fetches client homepage view data using configured query parameters. */
export async function getFetchClientHomepageViewData(
    {queries}: FetchConfig = {}
): Promise<FetchRequestReturns<ClientHomepageViewData>> {
    const url = buildURL({
        baseURL: ClientHomepageBaseURL,
        path: "/home-page-data",
        queries,
    });

    return useFetchAPI({url, method: "GET"});
}