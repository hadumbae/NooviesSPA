/**
 * @fileoverview Query key factory for person-centric movie credit data.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Standardized query keys for fetching MovieCredit documents in relation to a Person.
 */
export const PersonCreditQueryKeys = buildQueryKey(
    ["movie_credits", "list", "person"],
    {filmography: ["filmography", "recent"]},
);