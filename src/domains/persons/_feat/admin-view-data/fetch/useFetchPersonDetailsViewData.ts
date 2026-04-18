/**
 * @fileoverview Data fetching hook for the administrative person profile view.
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {
    getFetchPersonDetailsViewData,
    PersonDetailsViewData,
    PersonDetailsViewSchema
} from "@/domains/persons/_feat/admin-view-data";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {PersonAdminViewQueryKeys} from "@/domains/persons/_feat/admin-view-data/fetch/querykeys.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Configuration for fetching person detail view data.
 */
type FetchConfig = {
    slug: SlugString;
    limit?: number;
    options?: UseQueryOptions<PersonDetailsViewData>;
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