/**
 * @fileoverview React Query hook for fetching and validating a person's filmography.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {getFetchFilmographyForPerson} from "@/domains/movie-credits/_feat/person-credit/repository";
import {PersonFilmography, PersonFilmographySchema} from "@/domains/movie-credits/_feat/person-credit/schema";
import {PersonCreditQueryKeys} from "@/domains/movie-credits/_feat/person-credit/fetch/PersonCreditQueryKeys.ts";

/** Parameters for the useFetchFilmographyForPerson hook. */
type FetchParams = {
    _id: ObjectId;
    config?: RequestOptions;
    options?: FetchQueryOptions<PersonFilmography>;
};

/**
 * Fetches and validates a person's grouped filmography.
 */
export function useFetchFilmographyForPerson(
    {_id, options, config}: FetchParams
): UseQueryResult<PersonFilmography, HttpResponseError> {
    /** Wraps the repository call with Zod schema validation. */
    const fetchCredits = buildQueryFn<PersonFilmography>({
        action: () => getFetchFilmographyForPerson({_id, config}),
        schema: PersonFilmographySchema,
    });

    return useQuery({
        queryKey: PersonCreditQueryKeys.filmography({_id, ...config}),
        queryFn: fetchCredits,
        ...useQueryOptionDefaults(options),
    });
}