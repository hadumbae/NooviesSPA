import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";

type APIParams<TReturns = unknown> = {
    action: () => Promise<FetchReturns<TReturns>>;
    errorMessage?: string;
}

export default function useQueryFnHandler<TReturns = unknown>(params: APIParams<TReturns>) {
    const {action, errorMessage} = params;

    return async () => {
        const {response, result} = await action();

        if (!response.ok) {
            const message = errorMessage || "Failed to fetch data. Please try again.";
            throwResponseError({response, result, message});
        }

        return result;
    }
}