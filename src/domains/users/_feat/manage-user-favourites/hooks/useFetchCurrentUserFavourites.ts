/**
 * @file useFetchCurrentUserFavourites.ts
 * Query hook for fetching current user's favourite movies.
 */

import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {useQuery} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {getUserFavourites} from "@/domains/users/_feat/manage-user-favourites/repository";
import {ManageUserFavouritesQueryKeys} from "@/domains/users/_feat/manage-user-favourites/hooks";

/** Pagination params with optional query options. */
type FetchParams = Partial<PaginationValues> & {
    options?: FetchQueryOptions<unknown>
}

/**
 * Fetches the authenticated user's favourite movies.
 */
export function useFetchCurrentUserFavourites(
    {page = 1, perPage = 10, options}: FetchParams
) {
    const fetchUserFavourites = useQueryFnHandler({
        action: () => getUserFavourites({page, perPage}),
        errorMessage: "Failed to fetch user's favourites.",
    });

    return useQuery({
        queryKey: ManageUserFavouritesQueryKeys.fetchCurrent(),
        queryFn: fetchUserFavourites,
        ...useQueryOptionDefaults(options),
    });
}
