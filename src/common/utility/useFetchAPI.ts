import {FetchError} from "@/common/type/error/FetchError.ts";
import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import RequestMethod from "@/common/type/RequestMethod.ts";

export interface useFetchAPIParams {
    url: string;
    method: RequestMethod;
    data?: Record<string, unknown>;
}

export default async function useFetchAPI<T = any>(params: useFetchAPIParams): Promise<FetchReturns<T>> {
    const {url, method, data} = params;

    const fetchOptions: RequestInit = {
        method,
        credentials: "include",
        headers: { ContentType: "application/json" },
        ...(data ? {body: JSON.stringify(data)} : {}),
    };

    const response = await fetch(url, fetchOptions);
    let result: any;

    try {
        result = await response.json();
    } catch (error: unknown) {
        console.error("Error in Fetch: ", error);
        throw new FetchError({message: `${response.status} ${response.statusText}`});
    }

    return {response, result};
}