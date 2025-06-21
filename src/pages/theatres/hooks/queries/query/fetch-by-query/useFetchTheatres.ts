import {EntityPaginatedQuery, RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import {TheatreFilterQuery} from "@/pages/theatres/schema/queries/TheatreFilterQuerySchema.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {useQuery} from "@tanstack/react-query";

type FetchQueries = RequestOptions & EntityPaginatedQuery & TheatreFilterQuery;

export default function useFetchTheatres(queries: FetchQueries = {}) {
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