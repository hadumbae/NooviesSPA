import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

const HandleFetchError = async (
    {fetchQueryFn, message}: {fetchQueryFn: () => Promise<FetchReturns>, message?: string}
) => {
    const {response, result} = await fetchQueryFn();


    if (!response.ok) {
        const {message: resultMessage = "Error. Please try again."} = result;
        throw new HttpResponseError({response, message: message || resultMessage});
    }

    return {
        response,
        result,
    };
}

export default HandleFetchError;