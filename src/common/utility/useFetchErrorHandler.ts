import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import {FetchError} from "@/common/type/error/FetchError.ts";

const FetchErrorHandler = async (
    {fetchQueryFn, message}: {fetchQueryFn: () => Promise<FetchReturns>, message?: string}
) => {
    const { response, result } = await fetchQueryFn();

    if (!response.ok) {
        const {message: resultMessage = "Failed" , errors = []} = result;
        throw new FetchError({message: message || resultMessage, errors});
    }

    return {response, result};
}

export default FetchErrorHandler;