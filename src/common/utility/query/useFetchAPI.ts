import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import RequestMethod from "@/common/type/RequestMethod.ts";

export interface useFetchAPIParams<TData> {
    url: string;
    method: RequestMethod;
    data?: TData;
}

export default async function useFetchAPI<TData = any, TReturns = any>(params: useFetchAPIParams<TData>): Promise<FetchReturns<TReturns>> {

    const {url, method, data} = params;

    const fetchOptions: RequestInit = {
        method,
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        ...(data ? {body: JSON.stringify(data)} : {}),
    };

    const response = await fetch(url, fetchOptions);
    let result: any;

    try {
        result = await response.json();
    } catch (error: unknown) {
        console.error("Error in Fetch: ", error);
        throw new Error(`${response.status} ${response.statusText}`);
    }

    return {response, result};
}