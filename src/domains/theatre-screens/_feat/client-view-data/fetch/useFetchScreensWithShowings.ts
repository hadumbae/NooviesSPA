/**
 * @fileoverview React Query hook for fetching screens with scheduled showings.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {ObjectId} from "@/common/_schemas";
import {DateOnlyString} from "@/common/_schemas/dates/DateOnlyStringSchema.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";

import {TheatreScreenSchedule, TheatreScreenScheduleSchema} from "@/domains/theatre-screens/_schema";
import {fetchScreensWithShowings} from "@/domains/theatre-screens/_feat/client-view-data/repository";
import {TheatreScreenClientViewQueryKeys} from "@/domains/theatre-screens/_feat/client-view-data/fetch/queryKeys.ts";

type FetchParams = {
    theatreID: ObjectId | SlugString;
    dateString: DateOnlyString;
    options?: FetchQueryOptions<TheatreScreenSchedule[]>;
};

/**
 * React Query hook for fetching screens with their scheduled showings for a given theatre and date.
 */
export function useFetchScreensWithShowings(
    {theatreID, dateString, options}: FetchParams
): UseQueryResult<TheatreScreenSchedule[], HttpResponseError> {
    const fetchScreens = buildQueryFn<TheatreScreenSchedule[]>({
        action: () => fetchScreensWithShowings({theatreID, localDate: dateString}),
        schema: generateArraySchema(TheatreScreenScheduleSchema),
    });

    return useQuery({
        queryKey: TheatreScreenClientViewQueryKeys.withShowings({theatreID, dateString}),
        queryFn: fetchScreens,
        ...useQueryOptionDefaults(options),
    });
}