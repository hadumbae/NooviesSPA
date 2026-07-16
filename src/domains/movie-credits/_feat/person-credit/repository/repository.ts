import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ObjectId} from "@/common/_schemas";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {PersonCreditBaseURL} from "@/domains/movie-credits/_feat/person-credit/repository/baseURL.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {PersonFilmography} from "@/domains/movie-credits/_feat/person-credit/schema";

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
