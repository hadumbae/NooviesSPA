export type FetchQueryReturns<T> = {
    queries: T;
    isSuccess: boolean;
    isPending: boolean;
    isError: boolean;
    error: Error | null;
};