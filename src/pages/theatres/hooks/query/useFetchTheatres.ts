import {TheatreFilterQuery} from "@/pages/theatres/schema/queries/TheatreFilterQuerySchema.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions, RequestPaginationOptions} from "@/common/type/request/RequestOptions.ts";

type FetchQueries = RequestOptions & RequestPaginationOptions & TheatreFilterQuery;

export default function useFetchTheatres(queries: FetchQueries = {}): UseQueryResult<unknown, HttpResponseError> {
    const queryKey = ["fetch_theatres_by_query", queries] as const;

    const fetchTheatres = useQueryFnHandler({
        action: () => TheatreRepository.query({queries}),
        errorMessage: "Failed to fetch theatre data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchTheatres,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}