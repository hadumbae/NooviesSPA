import {EntityPaginatedQuery, RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {useQuery} from "@tanstack/react-query";

type FetchQueries = RequestOptions & EntityPaginatedQuery;

export default function useFetchShowings(queries: FetchQueries) {
    const queryKey = ["fetch_showings_by_query", queries] as const;

    const fetchByQuery = useQueryFnHandler({
        action: () => ShowingRepository.query({queries}),
        errorMessage: "Failed to fetch showing data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchByQuery,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}