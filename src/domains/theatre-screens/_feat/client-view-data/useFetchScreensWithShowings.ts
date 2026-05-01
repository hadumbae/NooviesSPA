/**
 * @fileoverview React Query hook for fetching screens with scheduled showings.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {fetchScreensWithShowings} from "./repository/repository.ts";
import {TheatreScreenSchedule, TheatreScreenScheduleSchema} from "@/domains/theatre-screens/schema/model";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {TheatreScreenClientViewQueryKeys} from "@/domains/theatre-screens/_feat/client-view-data/queryKeys.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {DateOnlyString} from "@/common/schema/dates/DateOnlyStringSchema.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import { FetchQueryOptions } from "@/common/type/query/FetchQueryOptions.ts";

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