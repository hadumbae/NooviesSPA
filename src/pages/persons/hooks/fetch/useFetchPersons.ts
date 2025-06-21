import {PersonFilterQuery} from "@/pages/persons/schema/queries/PersonFilterQuerySchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {EntityPaginatedQuery, RequestOptions,} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";

type QueryParams = RequestOptions & EntityPaginatedQuery & PersonFilterQuery;

export default function useFetchPersons(queries: QueryParams): UseQueryResult<unknown> {
    const queryKey = ["fetch_person_by_query", queries] as const;

    const fetchPersons = useQueryFnHandler({
        action: () => PersonRepository.query({queries}),
        errorMessage: "Failed to fetch person(s) data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchPersons,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}