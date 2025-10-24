import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

interface IMovieQueryRepository {
    baseURL: string;

    fetchPaginatedMoviesWithData(
        params: { page: number, perPage: number, queries: Record<string, string> }
    ): Promise<RequestReturns>;
}

const repository: IMovieQueryRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/movies`,

    fetchPaginatedMoviesWithData(
        params: { page: number; perPage: number; queries: Record<string, string> }
    ): Promise<RequestReturns> {
        const {page, perPage, queries} = params;

        const url = buildQueryURL({
            baseURL: this.baseURL,
            queries: {page, perPage, ...queries},
            path: '/query/populated'
        });

        return useFetchAPI({url, method: "GET"});
    }
};

export default repository;