import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ShowingDetailsViewData} from "@/views/admin/showings/_feat/admin-view-data/schema";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {ZodType, ZodTypeDef} from "zod";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {getFetchShowingDetailsViewData} from "@/views/admin/showings/_feat/admin-view-data/repository";
import {ShowingAdminViewDataQueryKeys} from "@/views/admin/showings/_feat/admin-view-data/fetch/queryKeys.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

type FetchConfig<TData = unknown> = {
    slug: SlugString;
    schema: ZodType<TData, ZodTypeDef, unknown>;
    options?: FetchQueryOptions<TData>;
}

export function useFetchShowingDetailsViewData(
    {slug, schema, options}: FetchConfig
): UseQueryResult<ShowingDetailsViewData, HttpResponseError> {
    const fetchViewData = buildQueryFn({
        action: () => getFetchShowingDetailsViewData({slug}),
        schema,
    });

    return useQuery({
        queryKey: ShowingAdminViewDataQueryKeys.showingDetails({slug}),
        queryFn: fetchViewData,
        ...useQueryOptionDefaults(options),
    })
}