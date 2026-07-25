/**
 * @fileoverview Hook for fetching and validating composite user data for the admin details view.
 */

import {ObjectId} from "@/common/_schemas";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {buildQueryFn, useQueryOptionDefaults} from "@/common/_feat";
import {FetchQueryOptions} from "@/common/_types";
import {
    getFetchUserDetailsViewData,
    UserAdminViewDataQueryKeys,
    UserDetailsViewData,
    UserDetailsViewDataSchema
} from "@/domains/users/_feat/admin-view-data";

/** Configuration for fetching user details view data. */
export type FetchConfig = {
    userID: ObjectId;
    reviewCount?: number;
    reservationCount?: number;
    options?: FetchQueryOptions<UserDetailsViewData>;
}

/** Fetches and validates the data required for the User Details admin interface. */
export function useFetchUserDetailsViewData(
    {userID, reviewCount, reservationCount, options}: FetchConfig
): UseQueryResult<UserDetailsViewData, HttpResponseError> {
    const fetchUserDetails = buildQueryFn<UserDetailsViewData>({
        action: () => getFetchUserDetailsViewData({userID, reviewCount, reservationCount}),
        schema: UserDetailsViewDataSchema,
    });

    return useQuery({
        queryKey: UserAdminViewDataQueryKeys.userDetails(),
        queryFn: fetchUserDetails,
        ...useQueryOptionDefaults(options),
    });
}