/**
 * @fileoverview Hook for fetching and validating person information view data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {
    getFetchPersonInfoViewData,
    PersonClientViewQueryKeys,
    PersonInfoViewData,
    PersonInfoViewDataSchema
} from "@/domains/persons/_feat/client-view-data";
import {SlugString} from "@/common/_schemas";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/** Configuration for fetching person information. */
type FetchConfig = {
    slug: SlugString;
    limit?: number;
    options?: FetchQueryOptions<PersonInfoViewData>;
};

/**
 * Fetches and validates composite data for the person information view.
 */
export function useFetchPersonInfoViewData(
    {slug, limit, options}: FetchConfig
): UseQueryResult<PersonInfoViewData, HttpResponseError> {
    const fetchPersonInfo = buildQueryFn({
        action: () => getFetchPersonInfoViewData({slug, limit}),
        schema: PersonInfoViewDataSchema,
    });

    return useQuery({
        queryKey: PersonClientViewQueryKeys.info({slug, limit}),
        queryFn: fetchPersonInfo,
        ...useQueryOptionDefaults(options),
    });
}