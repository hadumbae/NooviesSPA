import {useQuery} from "@tanstack/react-query";
import useFetchErrorHandler from "@/common/utility/useFetchErrorHandler.ts";
import parseResponseData from "@/common/utility/parseResponseData.ts";
import fetchReturns from "@/common/type/fetch/FetchReturns.ts";
import {ZodType} from "zod";

interface Props<TSchema extends ZodType, TReturnData> {
    queryKey: string,
    schema: TSchema;
    action: () => Promise<fetchReturns<TReturnData>>;
}

export default function useFetchSchemaData<TSchema extends ZodType, TReturnData>(
    {schema, action, queryKey}: Props<TSchema, TReturnData>
) {
    const fetchData = async () => {
        const {result: data} = await useFetchErrorHandler({fetchQueryFn: action});
        return parseResponseData<TSchema, TReturnData>({schema, data});
    };

    return useQuery<TReturnData>({
        queryKey: [queryKey],
        queryFn: fetchData,
    });
}