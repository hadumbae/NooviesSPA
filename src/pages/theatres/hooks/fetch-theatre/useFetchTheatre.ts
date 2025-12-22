import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

export default function useFetchTheatre<TData>(
    {_id, ...requestOptions}: FetchByIDParams
): UseQueryResult<TData, HttpResponseError> {
    const queryKey = ["fetch_single_theatre", {_id, ...requestOptions}];

    const action = useQueryFnHandler<TData>({
        action: () => TheatreRepository.get({_id, ...requestOptions}),
        errorMessage: "Failed to fetch theatre data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: action,
    });
}