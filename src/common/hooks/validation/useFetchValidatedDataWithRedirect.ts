import {QueryKey, UseQueryResult} from "@tanstack/react-query";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";
import fetchReturns from "@/common/type/fetch/FetchReturns.ts";
import {ZodType} from "zod";
import useQueryWithRedirect from "@/common/hooks/errors/useQueryWithRedirect.ts";

interface Props<TSchema extends ZodType, TReturnData> {
    queryKey: QueryKey,
    schema: TSchema;
    action: () => Promise<fetchReturns<TReturnData>>;
}

/**
 * Custom hook that fetches data using a provided action, validates it with a Zod schema,
 * and manages the query state with React Query. It also handles HTTP errors by redirecting
 * when necessary.
 *
 * @template TSchema - A Zod schema used for validating the fetched data.
 * @template TReturnData - The expected shape of the data returned by the action.
 *
 * @param {Object} props - The properties for configuring the hook.
 * @param {string} props.queryKey - A unique key for the query, used by React Query for caching and state management.
 * @param {TSchema} props.schema - The Zod schema to validate the fetched data against.
 * @param {() => Promise<fetchReturns<TReturnData>>} props.action - An asynchronous function that performs the data fetching.
 *   This function should throw an error if the HTTP status is not 200.
 *
 * @returns {UseQueryResult<TReturnData>} - The result of the query, including the data, loading state, and error information.
 */
export default function useFetchValidatedDataWithRedirect<TSchema extends ZodType, TReturnData>(
    {schema, action, queryKey}: Props<TSchema, TReturnData>
): UseQueryResult<TReturnData> {
    const fetchData = async () => {
        const {result: data} = await useFetchErrorHandler({fetchQueryFn: action});
        return parseResponseData<TSchema, TReturnData>({schema, data});
    };

    return useQueryWithRedirect({queryKey, queryFn: fetchData});
}