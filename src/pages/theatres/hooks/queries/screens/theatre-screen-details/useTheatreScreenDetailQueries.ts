import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import useFetchScreen from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreen.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {FetchQueryReturns} from "@/common/type/validate-queries/FetchQueryReturns.ts";
import {UseQueryResult} from "@tanstack/react-query";

/**
 * Parameters for fetching theatre and screen details.
 *
 * @property theatreID - The unique identifier of the theatre to fetch.
 * @property screenID - The unique identifier of the screen to fetch.
 */
type FetchTheatreAndScreenParams = {
    theatreID: ObjectId;
    screenID: ObjectId;
};

/**
 * A collection of `UseQueryResult` objects for fetching a theatre
 * and a screen, with strongly typed result data.
 *
 * @property theatre - A `UseQueryResult` returning {@link TheatreDetails}.
 * @property screen - A `UseQueryResult` returning {@link ScreenDetails}.
 */
type ReturnQueries = {
    theatre: UseQueryResult<TheatreDetails>;
    screen: UseQueryResult<ScreenDetails>;
};

/**
 * React hook that fetches detailed data for both a theatre and a screen
 * based on their provided IDs. It combines the query results from both requests
 * into a standardized return shape with aggregated status flags.
 *
 * @param params - Parameters required to fetch theatre and screen details.
 * @param params.theatreID - The unique identifier of the theatre to fetch.
 * @param params.screenID - The unique identifier of the screen to fetch.
 *
 * @returns A {@link FetchQueryReturns} object containing:
 * - `queries` — An object with `theatre` and `screen` query results (`UseQueryResult` objects).
 * - `isSuccess` — `true` if at least one query has completed successfully.
 * - `isPending` — `true` if at least one query is in an initial loading state.
 * - `isFetching` — `true` if at least one query is actively fetching (including background refresh).
 * - `isError` — `true` if at least one query encountered an error.
 * - `error` — The first {@link HttpResponseError} encountered among the queries, or `null` if none.
 *
 * @example
 * ```ts
 * const { queries, isSuccess, isPending, isFetching, isError, error } =
 *   useTheatreScreenDetailQueries({ theatreID, screenID });
 *
 * if (isFetching) {
 *   console.log("Refreshing data in background...");
 * }
 *
 * if (isError) {
 *   console.error(error?.message);
 * }
 *
 * if (isSuccess) {
 *   console.log("Theatre:", queries.theatre.data);
 *   console.log("Screen:", queries.screen.data);
 * }
 * ```
 */
export default function useTheatreScreenDetailQueries(
    params: FetchTheatreAndScreenParams
): FetchQueryReturns<ReturnQueries> {
    const {theatreID, screenID} = params;

    const theatreQuery = useFetchTheatre<TheatreDetails>({_id: theatreID, virtuals: true, populate: true});
    const screenQuery = useFetchScreen<ScreenDetails>({_id: screenID, virtuals: true, populate: true});

    const queries = [theatreQuery, screenQuery];

    const isSuccess = queries.some(q => q.isSuccess);
    const isPending = queries.some(q => q.isPending);
    const isFetching = queries.some(q => q.isFetching);
    const isError = queries.some(q => q.isError);
    const error = queries.find(q => q.isError)?.error ?? null;

    return {
        queries: {
            theatre: theatreQuery,
            screen: screenQuery,
        },
        isSuccess,
        isPending,
        isFetching,
        isError,
        error,
    };
}