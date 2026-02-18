/**
 * @file useFetchCurrentUserFavourites.ts
 * Query hook for fetching current user's favourite movies.
 */

import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {useQuery} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import * as UserFavouriteRepository from "@/pages/users/repositories/favourites/UserFavouriteRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

/** Pagination params with optional query options. */
type FetchParams = Partial<PaginationValues> & {
    options?: UseQueryOptions<unknown>
}

/**
 * Fetches the authenticated user's favourite movies.
 */
export function useFetchCurrentUserFavourites(
    {page = 1, perPage = 10, options}: FetchParams
) {
    const fetchUserFavourites = useQueryFnHandler({
        action: () => UserFavouriteRepository.getUserFavourites({page, perPage}),
        errorMessage: "Failed to fetch user's favourites.",
    });

    return useQuery({
        queryKey: ["profile", "favourites", "fetch"],
        queryFn: fetchUserFavourites,
        ...useQueryOptionDefaults(options),
    });
}
