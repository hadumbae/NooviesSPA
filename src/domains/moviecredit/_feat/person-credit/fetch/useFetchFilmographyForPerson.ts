/**
 * @fileoverview React Query hook for fetching a person's filmography.
 * * This hook manages the state and caching for retrieving a grouped list of
 * MovieCredit documents associated with a specific Person. It automates the
 * validation of the response data against the PersonFilmographySchema.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {getFetchFilmographyForPerson} from "@/domains/moviecredit/_feat/person-credit/repository/repository.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {
    PersonFilmography,
    PersonFilmographySchema
} from "@/domains/moviecredit/_feat/person-credit/schemas/PersonFilmographySchema.ts";
import {PersonCreditQueryKeys} from "@/domains/moviecredit/_feat/person-credit/fetch/PersonCreditQueryKeys.ts";

/**
 * Parameters for the useFetchFilmographyForPerson hook.
 */
type FetchParams = {
    _id: ObjectId;
    config?: RequestOptions;
    options?: UseQueryOptions<PersonFilmography>;
};

/**
 * Custom hook to fetch and validate a person's grouped filmography.
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