import useFetchShowing from "@/pages/showings/hooks/queries/useFetchShowing.ts";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import useFetchPaginatedShowingSeating from "@/pages/seatmap/hooks/queries/useFetchPaginatedShowingSeating.ts";
import {UseQueryResult} from "@tanstack/react-query";
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import {PaginatedSeatMaps} from "@/pages/seatmap/schema/SeatMapPaginationSchema.ts";

interface useFetchShowingWithSeatingReturns {
    query: {showing: UseQueryResult<Showing, Error>, seating: UseQueryResult<PaginatedSeatMaps, Error>};
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: Error | null,
}

/**
 * Custom hook that fetches both showing details and associated seating data.
 *
 * @param showingID - The unique identifier of the showing to fetch data for.
 * @param [populate=false] - Whether to populate related data for the showing.
 *
 * @returns An object containing:
 * - `data`: An object with `showing` and `seating` data.
 * - `refetch`: Functions to refetch the showing and seating data.
 * - `isPending`: Indicates if any of the queries are currently loading.
 * - `isSuccess`: Indicates if any of the queries have successfully fetched data.
 * - `isError`: Indicates if any of the queries have encountered an error.
 * - `error`: The error object from the first encountered error, if any.
 *
 * @remarks
 * This hook combines `useFetchShowing` and `useFetchPaginatedShowingSeating` to provide a unified interface for
 * fetching a showing and its seating data. It aggregates the loading, success, and error states of both queries.
 */
export default function useFetchShowingWithSeating({showingID, populate = false}: {
    showingID: ObjectId,
    populate?: boolean
}): useFetchShowingWithSeatingReturns {
    const showingQuery = useFetchShowing({_id: showingID, populate});
    const seatingQuery = useFetchPaginatedShowingSeating({showingID});

    const queryArray = [showingQuery, seatingQuery];

    const isPending = queryArray.some(query => query.isPending);
    const isSuccess = queryArray.some(query => query.isSuccess);
    const isError = queryArray.some(query => query.isError);
    const error = queryArray.find(query => query.error)?.error ?? null;

    return {
        query: {showing: showingQuery, seating: seatingQuery},
        isPending,
        isError,
        isSuccess,
        error,
    }
}