import {UseQueryResult} from "@tanstack/react-query";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";
import fetchReturns from "@/common/type/fetch/FetchReturns.ts";
import {ZodType} from "zod";
import useQueryWithRedirect from "@/common/hooks/errors/useQueryWithRedirect.ts";

interface Props<TSchema extends ZodType, TReturnData> {
    queryKey: string,
    schema: TSchema;
    action: () => Promise<fetchReturns<TReturnData>>;
}

export default function useFetchSchemaData<
    TSchema extends ZodType,
    TReturnData,
>(
    {schema, action, queryKey}: Props<TSchema, TReturnData>
): UseQueryResult<TReturnData> {
    const fetchData = async () => {
        const {result: data} = await useFetchErrorHandler({fetchQueryFn: action});
        return parseResponseData<TSchema, TReturnData>({schema, data});
    };

    return useQueryWithRedirect({
        queryKey: [queryKey],
        queryFn: fetchData,
    });
}