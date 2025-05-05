import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";

interface IMovieQueryRepository {
    baseURL: string;

    fetchPaginatedMoviesWithData(
        params: { page: number, perPage: number, queries: Record<string, string> }
    ): Promise<FetchReturns>;
}

const repository: IMovieQueryRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/movies`,

    fetchPaginatedMoviesWithData(
        params: { page: number; perPage: number; queries: Record<string, string> }
    ): Promise<FetchReturns> {
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