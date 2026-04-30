/**
 * @fileoverview React Query hook for fetching screens with scheduled showings.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "src/common/type/query/FetchQueryOptions.ts";
import {ObjectId} from "src/common/schema/strings/object-id/IDStringSchema.ts";
import {DateOnlyString} from "src/common/schema/dates/DateOnlyStringSchema.ts";
import {fetchScreensWithShowings} from "./repository/repository.ts";
import useQueryOptionDefaults from "src/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "src/common/errors/HttpResponseError.ts";
import {SlugString} from "src/common/schema/strings/simple-strings/SlugString.ts";
import {ScreenWithShowings, ScreenWithShowingsArraySchema} from "@/domains/theatre-screens/schema/model";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {TheatreScreenClientViewQueryKeys} from "@/domains/theatre-screens/_feat/client-view-data/queryKeys.ts";

type FetchParams = {
    theatreID: ObjectId | SlugString;
    dateString: DateOnlyString;
    options?: FetchQueryOptions<ScreenWithShowings[]>;
};

/**
 * React Query hook for fetching screens with their scheduled showings for a given theatre and date.
 */
export function useFetchScreensWithShowings(
    {theatreID, dateString, options}: FetchParams
): UseQueryResult<ScreenWithShowings[], HttpResponseError> {
    const fetchScreens = buildQueryFn<ScreenWithShowings[]>({
        action: () => fetchScreensWithShowings({theatreID, localDate: dateString}),
        schema: ScreenWithShowingsArraySchema,
    });

    return useQuery({
        queryKey: TheatreScreenClientViewQueryKeys.withShowings({theatreID, dateString}),
        queryFn: fetchScreens,
        ...useQueryOptionDefaults(options),
    });
}