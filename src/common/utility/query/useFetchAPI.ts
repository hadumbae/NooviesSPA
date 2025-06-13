import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import RequestMethod from "@/common/type/RequestMethod.ts";

interface useFetchAPIParams<TData> {
    url: string;
    method: RequestMethod;
    data?: TData;
}

export default async function useFetchAPI<TData = unknown, TReturns = unknown>(params: useFetchAPIParams<TData>): Promise<FetchReturns<TReturns>> {
    const {url, method, data} = params;

    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

    const credentials: RequestCredentials | undefined = "include";
    const headers: HeadersInit | undefined = isFormData ? undefined : {"Content-Type": "application/json"}
    const body: BodyInit | undefined = isFormData
        ? (data as FormData)
        : (data ? JSON.stringify(data) : undefined);

    const response = await fetch(url, {method, credentials, headers, body});

    let result: TReturns;

    try {
        result = await response.json();
    } catch (error: unknown) {
        console.error("Error in Fetch: ", error);
        throw new Error(`${response.status} ${response.statusText}`);
    }

    return {response, result};
}