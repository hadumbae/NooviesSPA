/**
 * @fileoverview Hook for fetching and validating paginated person data for the browse view.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {PersonClientViewQueryKeys} from "@/domains/persons/_feat/client-view-data/keys";
import {getFetchBrowsePersonsViewData,} from "@/domains/persons/_feat/client-view-data/repository";
import {
    BrowsePersonsQueryOptions,
    BrowsePersonsViewData,
    BrowsePersonsViewDataSchema,
} from "@/domains/persons/_feat/client-view-data/browse-persons/schema";

/** Configuration for fetching browse persons view data. */
type FetchConfig = {
    page?: number;
    perPage?: number;
    queries?: BrowsePersonsQueryOptions;
    options?: FetchQueryOptions<BrowsePersonsViewData>;
};

/** Fetches and validates composite data for the Browse Persons client view. */
export function useFetchBrowsePersonsViewData(
    {page, perPage, queries, options}: FetchConfig
): UseQueryResult<BrowsePersonsViewData, HttpResponseError> {
    const fetchPersons = buildQueryFn<BrowsePersonsViewData>({
        action: () => getFetchBrowsePersonsViewData({page, perPage, queries}),
        schema: BrowsePersonsViewDataSchema,
    });

    return useQuery({
        queryKey: PersonClientViewQueryKeys.browse({page, perPage, ...queries}),
        queryFn: fetchPersons,
        ...useQueryOptionDefaults(options),
    });
}