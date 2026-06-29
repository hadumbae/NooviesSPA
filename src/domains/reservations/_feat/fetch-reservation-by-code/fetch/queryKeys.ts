/**
 * @fileoverview Query key definitions for fetching reservation data by code.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Query keys for the reservation fetch-by-code operation. */
export const FetchByCodeQueryKeys = buildQueryKey(
    ["reservations", "fetch", "by-code"],
    {fetchByCode: ["unique"]}
);