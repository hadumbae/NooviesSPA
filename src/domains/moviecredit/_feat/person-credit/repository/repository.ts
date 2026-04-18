import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {PersonCreditBaseURL} from "@/domains/moviecredit/_feat/person-credit/repository/baseURL.ts";
import {buildURL} from "@/common/features/fetch-api";
import {PersonFilmography} from "@/domains/moviecredit/_feat/person-credit";

/**
 * Parameters for grouped movie credit queries by person.
 */
export type FilmographyForPersonConfig = {
    _id: ObjectId;
    config?: Pick<RequestOptions, "limit">;
};

export async function getFetchFilmographyForPerson(
    {_id, config}: FilmographyForPersonConfig
): Promise<RequestReturns<PersonFilmography>> {
    const url = buildURL({
        baseURL: PersonCreditBaseURL,
        path: `/person/${_id}/filmography/recent`,
        queries: config,
    });

    return useFetchAPI({url, method: "GET"});
}
