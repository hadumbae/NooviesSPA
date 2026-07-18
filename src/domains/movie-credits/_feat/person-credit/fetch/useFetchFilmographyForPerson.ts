/**
 * @fileoverview React Query hook for fetching and validating a person's filmography.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";
import {FetchQueryOptions} from "@/common/_types/fetch-queries/FetchQueryOptions.ts";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {RequestOptions} from "@/common/_types/request/RequestOptions.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
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