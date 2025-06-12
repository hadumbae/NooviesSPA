import {PersonFilterQuery} from "@/pages/persons/schema/queries/PersonFilterQuerySchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {EntityPaginatedQuery, RequestOptions,} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";

type QueryParams = RequestOptions & EntityPaginatedQuery & {
    filters?: PersonFilterQuery;
};

export default function useFetchPersonQuery(params: QueryParams): UseQueryResult<unknown> {
    const {filters = {}, paginated, page, perPage, ...options} = params
    const pagination: EntityPaginatedQuery = paginated
        ? {paginated: true, page, perPage}
        : {paginated: false};

    const queryKey = ["fetch_person_by_query", {filters, pagination, options}] as const;

    const fetchPersons = async () => {
        const {response, result} = await PersonRepository.query({
            queries: {...filters, ...pagination, ...options}
        });

        if (!response.ok) {
            const message = "Failed to fetch persons.";
            throwResponseError({message, response, result});
        }

        return result;
    }

    return useQuery({
        queryKey,
        queryFn: fetchPersons,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}