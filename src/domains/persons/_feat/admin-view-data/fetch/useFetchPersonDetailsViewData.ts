/**
 * @fileoverview Data fetching hook for the administrative person profile view.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {PersonAdminViewQueryKeys} from "@/domains/persons/_feat/admin-view-data/fetch/querykeys.ts";
import {getFetchPersonDetailsViewData} from "@/domains/persons/_feat/admin-view-data/repository";
import {PersonDetailsViewData, PersonDetailsViewSchema} from "@/domains/persons/_feat/admin-view-data/schema";

/**
 * Configuration for fetching person detail view data.
 */
type FetchConfig = {
    slug: SlugString;
    limit?: number;
    options?: FetchQueryOptions<PersonDetailsViewData>;
}

/**
 * Custom hook to fetch and validate the composite person detail view data.
 */
export function useFetchPersonDetailsViewData(
    {slug, limit, options}: FetchConfig
): UseQueryResult<PersonDetailsViewData, HttpResponseError> {
    const fetchDetails = buildQueryFn<PersonDetailsViewData>({
        action: () => getFetchPersonDetailsViewData({slug, limit}),
        schema: PersonDetailsViewSchema,
    });

    return useQuery({
        queryKey: PersonAdminViewQueryKeys.details({slug, limit}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}